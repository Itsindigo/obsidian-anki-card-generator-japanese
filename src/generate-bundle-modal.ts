import { Modal, Notice, Setting, TextComponent } from "obsidian";
import type { App } from "obsidian";
import { pickDirectory } from "./directory-picker";
import {
  DEFAULT_ANKI_DECK_PLACEHOLDER,
  DEFAULT_BUNDLE_DIRECTORY_PLACEHOLDER,
} from "./ui-constants";
import type {
  GenerateBundleInput,
  JapaneseAnkiSettings,
} from "./types";

export class GenerateBundleModal extends Modal {
  private readonly settings: JapaneseAnkiSettings;
  private readonly initialPhrase: string;
  private readonly onSubmitCallback: (input: GenerateBundleInput) => void;

  private englishPhrase: string;
  private outputDirectory: string;
  private deckName = "";
  private tagsText: string;
  private noteSlug = "";
  private generateAudio: boolean;
  private syncToAnki: boolean;

  private outputDirectoryText: TextComponent | null = null;

  constructor(
    app: App,
    settings: JapaneseAnkiSettings,
    initialPhrase: string,
    onSubmit: (input: GenerateBundleInput) => void
  ) {
    super(app);
    this.settings = settings;
    this.initialPhrase = initialPhrase;
    this.onSubmitCallback = onSubmit;

    this.englishPhrase = initialPhrase;
    this.outputDirectory = settings.lastOutputDirectory;
    this.deckName = settings.lastDeckName;
    this.tagsText = settings.lastTags;
    this.generateAudio = settings.defaultGenerateAudio;
    this.syncToAnki = settings.defaultSyncToAnki;
  }

  onOpen(): void {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.createEl("h2", { text: "Generate Japanese Anki Bundle" });

    new Setting(contentEl)
      .setName("English phrase")
      .setDesc("The source phrase to translate into Japanese.");

    const phraseInput = contentEl.createEl("textarea", {
      attr: {
        rows: "4",
        placeholder: "e.g. Where is the train station?",
      },
    });
    phraseInput.style.width = "100%";
    phraseInput.style.marginBottom = "1em";
    phraseInput.value = this.englishPhrase;
    phraseInput.addEventListener("input", () => {
      this.englishPhrase = phraseInput.value;
    });

    new Setting(contentEl)
      .setName("Output directory")
      .setDesc(
        "Required for each run. The bundle note, JSON sidecar, and media folder will be created here."
      )
      .addText((text) =>
        {
          this.outputDirectoryText = text;
          return text
            .setPlaceholder(DEFAULT_BUNDLE_DIRECTORY_PLACEHOLDER)
            .setValue(this.outputDirectory)
            .onChange((value) => {
              this.outputDirectory = value.trim();
            });
        }
      )
      .addButton((button) =>
        button.setButtonText("Browse").onClick(() => {
          void this.browseForOutputDirectory();
        })
      );

    new Setting(contentEl)
      .setName("Deck name (optional)")
      .setDesc("Required only if you want to sync this bundle directly to Anki.")
      .addText((text) => {
        return text
          .setPlaceholder(DEFAULT_ANKI_DECK_PLACEHOLDER)
          .setValue(this.deckName)
          .onChange((value) => {
            this.deckName = value.trim();
          });
      });

    new Setting(contentEl)
      .setName("Tags")
      .setDesc("Comma-separated export tags.")
      .addText((text) =>
        text
          .setPlaceholder("japanese,anki")
          .setValue(this.tagsText)
          .onChange((value) => {
            this.tagsText = value;
          })
      );

    new Setting(contentEl)
      .setName("Note slug")
      .setDesc("Optional filename override. Leave blank to derive from the English phrase.")
      .addText((text) =>
        text
          .setPlaceholder("where-is-the-train-station")
          .setValue(this.noteSlug)
          .onChange((value) => {
            this.noteSlug = value.trim();
          })
      );

    new Setting(contentEl)
      .setName("Generate audio")
      .setDesc("Creates a spoken Japanese file in the media subfolder.")
      .addToggle((toggle) =>
        toggle.setValue(this.generateAudio).onChange((value) => {
          this.generateAudio = value;
        })
      );

    new Setting(contentEl)
      .setName("Sync to Anki")
      .setDesc("Pushes the generated Front and Back fields into Anki via AnkiConnect.")
      .addToggle((toggle) =>
        toggle.setValue(this.syncToAnki).onChange((value) => {
          this.syncToAnki = value;
        })
      );

    new Setting(contentEl).addButton((button) =>
      button
        .setButtonText("Generate Bundle")
        .setCta()
        .onClick(() => {
          const englishPhrase = this.englishPhrase.trim();
          const outputDirectory = this.outputDirectory.trim();
          const tags = this.tagsText
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean);

          if (!englishPhrase) {
            new Notice("Please enter an English phrase.");
            return;
          }

          if (!outputDirectory) {
            new Notice("Please enter an output directory.");
            return;
          }

          if (
            this.syncToAnki &&
            !this.deckName.trim() &&
            !this.settings.lastDeckName.trim()
          ) {
            new Notice("Please enter an Anki deck name to sync this bundle.");
            return;
          }

          this.close();
          this.onSubmitCallback({
            englishPhrase,
            outputDirectory,
            deckName: this.deckName.trim() || null,
            tags,
            noteSlug: this.noteSlug.trim(),
            generateAudio: this.generateAudio,
            syncToAnki: this.syncToAnki,
          });
        })
    );

    if (this.initialPhrase) {
      phraseInput.select();
    }
  }

  onClose(): void {
    this.contentEl.empty();
  }

  private async browseForOutputDirectory(): Promise<void> {
    try {
      const selectedDirectory = await pickDirectory(this.outputDirectory);
      if (!selectedDirectory) {
        return;
      }

      this.outputDirectory = selectedDirectory;
      this.outputDirectoryText?.setValue(selectedDirectory);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unknown error while opening the directory picker.";
      new Notice(`Failed to open directory picker: ${message}`, 10000);
    }
  }
}
