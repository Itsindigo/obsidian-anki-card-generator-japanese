import {
  FileSystemAdapter,
  MarkdownView,
  Notice,
  Plugin,
} from "obsidian";
import fs from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import {
  AnkiSyncService,
  buildAnkiSyncPayload,
} from "./anki-sync-service";
import { synthesizeJapaneseAudio } from "./audio";
import { ExportBundlesModal } from "./export-bundles-modal";
import { writeBundleFiles } from "./exporter";
import { GenerateBundleModal } from "./generate-bundle-modal";
import { buildReadings } from "./reading";
import { DEFAULT_SETTINGS, JapaneseAnkiSettingTab } from "./settings";
import { translateEnglishToJapanese } from "./translation";
import type {
  BundleRecord,
  ExportBundlesInput,
  GenerateBundleInput,
  JapaneseAnkiSettings,
} from "./types";

export default class JapaneseAnkiPlugin extends Plugin {
  settings: JapaneseAnkiSettings;

  async onload() {
    await this.loadSettings();

    this.addCommand({
      id: "generate-japanese-anki-bundle",
      name: "Generate Japanese Anki bundle",
      callback: () => {
        const initialPhrase = this.getActiveSelection();
        new GenerateBundleModal(
          this.app,
          this.settings,
          initialPhrase,
          (input) => {
            void this.generateBundle(input);
          }
        ).open();
      },
    });

    this.addCommand({
      id: "export-japanese-anki-bundles-to-anki",
      name: "Export Japanese Anki bundles to Anki",
      callback: () => {
        new ExportBundlesModal(this.app, this.settings, (input) => {
          void this.exportBundlesToAnki(input);
        }).open();
      },
    });

    this.addSettingTab(new JapaneseAnkiSettingTab(this.app, this));
  }

  async loadSettings() {
    const persistedSettings =
      (await this.loadData()) as Partial<JapaneseAnkiSettings> | null;

    this.settings = {
      ...DEFAULT_SETTINGS,
      ...persistedSettings,
      elevenLabsVoiceSettings: {
        ...DEFAULT_SETTINGS.elevenLabsVoiceSettings,
        ...(persistedSettings?.elevenLabsVoiceSettings ?? {}),
      },
    };
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  private getActiveSelection(): string {
    const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);

    if (!markdownView) {
      return "";
    }

    const selection = markdownView.editor.getSelection().trim();
    if (selection) {
      return selection;
    }

    return markdownView.editor
      .getLine(markdownView.editor.getCursor().line)
      .trim();
  }

  private async generateBundle(input: GenerateBundleInput) {
    const resolvedDeckName =
      (input.deckName ?? this.settings.lastDeckName.trim()) || null;

    if (!this.settings.deepLApiKey) {
      new Notice("Japanese Anki Bundle: set your DeepL API key in settings.");
      return;
    }

    if (input.generateAudio && !this.settings.elevenLabsApiKey) {
      new Notice("Japanese Anki Bundle: set your ElevenLabs API key in settings.");
      return;
    }

    if (input.syncToAnki && !resolvedDeckName) {
      new Notice("Japanese Anki Bundle: enter a deck name before syncing to Anki.");
      return;
    }

    try {
      new Notice("Translating phrase to Japanese...");
      const translation = await translateEnglishToJapanese(
        this.settings.deepLApiKey,
        input.englishPhrase
      );

      new Notice("Generating hiragana, katakana, and romaji...");
      const readings = await buildReadings(
        translation.japanese,
        this.settings.romajiSystem,
        this.getPluginInstallDir()
      );

      let audio = null;
      if (input.generateAudio) {
        new Notice("Generating ElevenLabs audio...");
        audio = await synthesizeJapaneseAudio(
          this.settings,
          translation.japanese
        );
      }

      new Notice("Writing bundle files...");
      const paths = await writeBundleFiles({
        input,
        translation,
        readings,
        audio,
      });

      let noteId: number | null = null;
      if (input.syncToAnki && resolvedDeckName) {
        new Notice("Syncing bundle to Anki...");
        const syncService = await AnkiSyncService.connect(
          this.settings.ankiConnectUrl
        );
        const syncPayload = buildAnkiSyncPayload(
          paths.record,
          resolvedDeckName
        );
        noteId = await syncService.sync(
          syncPayload,
          audio?.bytes ?? null
        );
        this.settings.lastDeckName = syncPayload.deckName;
      }

      this.settings.lastOutputDirectory = input.outputDirectory;
      this.settings.lastTags = input.tags.join(",");
      await this.saveSettings();

      const summary = [paths.notePath, paths.jsonPath, paths.audioPath]
        .filter(Boolean)
        .join(" | ");
      const syncSummary = noteId ? ` | Anki note ${noteId}` : "";
      new Notice(`Japanese Anki bundle created: ${summary}${syncSummary}`, 10000);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unknown error while generating bundle.";
      new Notice(`Japanese Anki Bundle failed: ${message}`, 10000);
      console.error("Japanese Anki Bundle error", error);
    }
  }

  private getPluginInstallDir(): string | undefined {
    const adapter = this.app.vault.adapter;

    if (!(adapter instanceof FileSystemAdapter)) {
      return undefined;
    }

    const basePath = adapter.getBasePath();
    const candidates = [
      path.resolve(basePath, this.app.vault.configDir, "plugins", this.manifest.id),
      this.manifest.dir ? path.resolve(basePath, this.manifest.dir) : "",
    ].filter(Boolean);

    for (const candidate of candidates) {
      if (fs.existsSync(candidate)) {
        return candidate;
      }
    }

    return candidates[0];
  }

  private async exportBundlesToAnki(input: ExportBundlesInput): Promise<void> {
    try {
      new Notice("Loading bundle files...");
      const directory = path.resolve(input.directory);
      const directoryEntries = await readdir(directory, { withFileTypes: true });
      const bundleFiles = directoryEntries
        .filter((entry) => entry.isFile() && entry.name.endsWith(".bundle.json"))
        .map((entry) => path.join(directory, entry.name))
        .sort((left, right) => left.localeCompare(right));

      if (bundleFiles.length === 0) {
        throw new Error(`No .bundle.json files were found in ${directory}.`);
      }

      const syncService = await AnkiSyncService.connect(
        this.settings.ankiConnectUrl
      );

      let exportedCount = 0;
      const failures: string[] = [];
      let lastSyncedDeckName: string | null = null;

      for (const bundlePath of bundleFiles) {
        try {
          const bundleText = await readFile(bundlePath, "utf8");
          const record = JSON.parse(bundleText) as BundleRecord;

          const audioBytes = await this.readBundleAudio(bundlePath, record);
          const syncPayload = buildAnkiSyncPayload(
            record,
            input.deckNameOverride,
            this.settings.lastDeckName.trim() || null
          );
          await syncService.sync(
            syncPayload,
            audioBytes
          );
          lastSyncedDeckName = syncPayload.deckName;
          exportedCount += 1;
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "Unknown export error.";
          failures.push(`${path.basename(bundlePath)}: ${message}`);
        }
      }

      this.settings.lastOutputDirectory = directory;
      if (lastSyncedDeckName) {
        this.settings.lastDeckName = lastSyncedDeckName;
      }
      await this.saveSettings();

      if (failures.length === 0) {
        new Notice(`Exported ${exportedCount} bundle(s) to Anki.`, 10000);
        return;
      }

      const failureSummary = failures.slice(0, 3).join(" | ");
      new Notice(
        `Exported ${exportedCount} bundle(s); ${failures.length} failed. ${failureSummary}`,
        15000
      );
      console.error("Japanese Anki Bundle export failures", failures);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unknown error while exporting bundles.";
      new Notice(`Japanese Anki Bundle export failed: ${message}`, 10000);
      console.error("Japanese Anki Bundle export error", error);
    }
  }

  private async readBundleAudio(
    bundlePath: string,
    record: BundleRecord
  ): Promise<Buffer | null> {
    const relativePath = record.audio.relativePath;
    if (!relativePath || !record.audio.fileName) {
      return null;
    }

    const audioPath = path.resolve(path.dirname(bundlePath), relativePath);
    if (!fs.existsSync(audioPath)) {
      throw new Error(`Audio file is missing: ${audioPath}`);
    }

    return readFile(audioPath);
  }
}
