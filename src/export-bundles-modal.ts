import { Modal, Notice, Setting, TextComponent } from "obsidian";
import type { App } from "obsidian";
import { pickDirectory } from "./directory-picker";
import {
  DEFAULT_ANKI_DECK_PLACEHOLDER,
  DEFAULT_BUNDLE_DIRECTORY_PLACEHOLDER,
} from "./ui-constants";
import type { ExportBundlesInput, JapaneseAnkiSettings } from "./types";

export class ExportBundlesModal extends Modal {
  private readonly settings: JapaneseAnkiSettings;
  private readonly onSubmitCallback: (input: ExportBundlesInput) => void;

  private directory: string;
  private deckNameOverride = "";
  private directoryText: TextComponent | null = null;

  constructor(
    app: App,
    settings: JapaneseAnkiSettings,
    onSubmit: (input: ExportBundlesInput) => void
  ) {
    super(app);
    this.settings = settings;
    this.onSubmitCallback = onSubmit;
    this.directory = settings.lastOutputDirectory;
  }

  onOpen(): void {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.createEl("h2", { text: "Export Bundles to Anki" });

    new Setting(contentEl)
      .setName("Bundle directory")
      .setDesc("Every .bundle.json file in this folder will be exported to Anki.")
      .addText((text) => {
        this.directoryText = text;
        return text
          .setPlaceholder(DEFAULT_BUNDLE_DIRECTORY_PLACEHOLDER)
          .setValue(this.directory)
          .onChange((value) => {
            this.directory = value.trim();
          });
      })
      .addButton((button) =>
        button.setButtonText("Browse").onClick(() => {
          void this.browseForDirectory();
        })
      );

    new Setting(contentEl)
      .setName("Deck override (optional)")
      .setDesc(
        "If set, every exported bundle will use this deck. If left blank, the exporter uses the bundle deck hint or your last used deck."
      )
      .addText((text) =>
        text
          .setPlaceholder(
            this.settings.lastDeckName || DEFAULT_ANKI_DECK_PLACEHOLDER
          )
          .setValue(this.deckNameOverride)
          .onChange((value) => {
            this.deckNameOverride = value.trim();
          })
      );

    new Setting(contentEl).addButton((button) =>
      button
        .setButtonText("Export Bundles")
        .setCta()
        .onClick(() => {
          const directory = this.directory.trim();
          if (!directory) {
            new Notice("Please choose a bundle directory.");
            return;
          }

          this.close();
          this.onSubmitCallback({
            directory,
            deckNameOverride: this.deckNameOverride.trim() || null,
          });
        })
    );
  }

  onClose(): void {
    this.contentEl.empty();
  }

  private async browseForDirectory(): Promise<void> {
    try {
      const selectedDirectory = await pickDirectory(this.directory);
      if (!selectedDirectory) {
        return;
      }

      this.directory = selectedDirectory;
      this.directoryText?.setValue(selectedDirectory);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unknown error while opening the directory picker.";
      new Notice(`Failed to open directory picker: ${message}`, 10000);
    }
  }
}
