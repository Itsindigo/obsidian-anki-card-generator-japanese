import {
  App,
  DropdownComponent,
  Notice,
  PluginSettingTab,
  Setting,
  SliderComponent,
  ToggleComponent,
} from "obsidian";
import {
  fetchElevenLabsVoiceSettings,
  fetchElevenLabsVoices,
  type ElevenLabsVoiceSummary,
} from "./elevenlabs";
import type JapaneseAnkiPlugin from "./main";
import type {
  ElevenLabsVoiceSettings,
  JapaneseAnkiSettings,
  RomajiSystem,
} from "./types";

const ELEVENLABS_MODEL_OPTIONS = [
  {
    value: "eleven_multilingual_v2",
    label: "Eleven Multilingual v2",
  },
] as const;

const ELEVENLABS_OUTPUT_FORMAT_OPTIONS = [
  {
    value: "mp3_44100_128",
    label: "MP3 44.1 kHz (128kbps)",
  },
] as const;

const DEFAULT_ELEVENLABS_VOICE_SETTINGS: ElevenLabsVoiceSettings = {
  speed: 0.7,
  stability: 1,
  similarityBoost: 0.6,
  style: 0.5,
  useSpeakerBoost: true,
};

export const DEFAULT_SETTINGS: JapaneseAnkiSettings = {
  deepLApiKey: "",
  ankiConnectUrl: "http://127.0.0.1:8765",
  defaultSyncToAnki: false,
  lastDeckName: "",
  elevenLabsApiKey: "",
  elevenLabsVoiceId: "",
  elevenLabsModelId: "eleven_multilingual_v2",
  elevenLabsOutputFormat: "mp3_44100_128",
  elevenLabsVoiceSettings: DEFAULT_ELEVENLABS_VOICE_SETTINGS,
  romajiSystem: "hepburn",
  defaultGenerateAudio: true,
  lastOutputDirectory: "",
  lastTags: "japanese,anki",
};

export class JapaneseAnkiSettingTab extends PluginSettingTab {
  plugin: JapaneseAnkiPlugin;

  constructor(app: App, plugin: JapaneseAnkiPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    containerEl.createEl("h2", { text: "Translation" });

    new Setting(containerEl)
      .setName("DeepL API key")
      .setDesc("Used for English to Japanese translation through the DeepL API.")
      .addText((text) =>
        text
          .setPlaceholder("DeepL auth key")
          .setValue(this.plugin.settings.deepLApiKey)
          .onChange(async (value) => {
            this.plugin.settings.deepLApiKey = value.trim();
            await this.plugin.saveSettings();
          })
      )
      .then((setting) => {
        const input = setting.controlEl.querySelector("input");
        if (input) input.type = "password";
      });

    new Setting(containerEl)
      .setName("Romaji system")
      .setDesc("The romanization system used when generating romaji.")
      .addDropdown((dropdown) => {
        const options: Array<{ value: RomajiSystem; label: string }> = [
          { value: "hepburn", label: "Hepburn" },
          { value: "passport", label: "Passport" },
          { value: "nippon", label: "Nippon" },
        ];

        for (const option of options) {
          dropdown.addOption(option.value, option.label);
        }

        dropdown.setValue(this.plugin.settings.romajiSystem);
        dropdown.onChange(async (value) => {
          this.plugin.settings.romajiSystem = value as RomajiSystem;
          await this.plugin.saveSettings();
        });
      });

    containerEl.createEl("h2", { text: "Anki" });

    new Setting(containerEl)
      .setName("AnkiConnect URL")
      .setDesc("Local AnkiConnect endpoint used when syncing cards directly to Anki.")
      .addText((text) =>
        text
          .setPlaceholder("http://127.0.0.1:8765")
          .setValue(this.plugin.settings.ankiConnectUrl)
          .onChange(async (value) => {
            this.plugin.settings.ankiConnectUrl = value.trim();
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName("Sync to Anki by default")
      .setDesc("You can still override this per bundle in the generation modal.")
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.defaultSyncToAnki)
          .onChange(async (value) => {
            this.plugin.settings.defaultSyncToAnki = value;
            await this.plugin.saveSettings();
          })
      );

    containerEl.createEl("h2", { text: "Audio" });

    new Setting(containerEl)
      .setName("ElevenLabs API key")
      .setDesc("Used when audio generation is enabled in the modal.")
      .addText((text) =>
        text
          .setPlaceholder("xi-api-key")
          .setValue(this.plugin.settings.elevenLabsApiKey)
          .onChange(async (value) => {
            this.plugin.settings.elevenLabsApiKey = value.trim();
            await this.plugin.saveSettings();
          })
      )
      .then((setting) => {
        const input = setting.controlEl.querySelector("input");
        if (input) input.type = "password";
      });

    let voiceDropdown: DropdownComponent | null = null;
    let voiceStatusEl: HTMLDivElement | null = null;
    let refreshButtonEl: HTMLButtonElement | null = null;
    let speedSlider: SliderComponent | null = null;
    let stabilitySlider: SliderComponent | null = null;
    let similaritySlider: SliderComponent | null = null;
    let styleSlider: SliderComponent | null = null;
    let speakerBoostToggle: ToggleComponent | null = null;

    const formatVoiceLabel = (voice: ElevenLabsVoiceSummary): string => {
      if (!voice.category) {
        return voice.name;
      }

      return `${voice.name} (${voice.category})`;
    };

    const setVoiceStatus = (message: string) => {
      if (voiceStatusEl) {
        voiceStatusEl.setText(message);
      }
    };

    const saveVoiceSettings = async () => {
      await this.plugin.saveSettings();
    };

    const applyVoiceSettingsToUi = (voiceSettings: ElevenLabsVoiceSettings) => {
      speedSlider?.setValue(Math.round(voiceSettings.speed * 100));
      stabilitySlider?.setValue(Math.round(voiceSettings.stability * 100));
      similaritySlider?.setValue(
        Math.round(voiceSettings.similarityBoost * 100)
      );
      styleSlider?.setValue(Math.round(voiceSettings.style * 100));
      speakerBoostToggle?.setValue(voiceSettings.useSpeakerBoost);
    };

    const setVoiceSettings = async (
      voiceSettings: ElevenLabsVoiceSettings
    ) => {
      this.plugin.settings.elevenLabsVoiceSettings = voiceSettings;
      applyVoiceSettingsToUi(voiceSettings);
      await saveVoiceSettings();
    };

    const loadSelectedVoiceSettings = async (
      voiceId: string,
      showSuccessNotice = false
    ) => {
      const apiKey = this.plugin.settings.elevenLabsApiKey.trim();
      if (!apiKey || !voiceId) {
        return;
      }

      try {
        setVoiceStatus("Loading selected voice settings from ElevenLabs...");
        const voiceSettings = await fetchElevenLabsVoiceSettings(apiKey, voiceId);
        await setVoiceSettings(voiceSettings);
        setVoiceStatus("Loaded voice defaults from ElevenLabs.");
        if (showSuccessNotice) {
          new Notice("Loaded ElevenLabs voice defaults.");
        }
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Unknown error while loading voice settings.";
        setVoiceStatus(message);
        new Notice(`Failed to load ElevenLabs voice settings: ${message}`, 10000);
      }
    };

    const populateVoiceDropdown = (
      voices: ElevenLabsVoiceSummary[],
      selectedVoiceId: string
    ) => {
      if (!voiceDropdown) {
        return;
      }

      voiceDropdown.selectEl.innerHTML = "";
      voiceDropdown.addOption("", "Select a voice");

      for (const voice of voices) {
        voiceDropdown.addOption(voice.voiceId, formatVoiceLabel(voice));
      }

      const hasSelectedVoice = voices.some(
        (voice) => voice.voiceId === selectedVoiceId
      );

      if (!hasSelectedVoice && selectedVoiceId) {
        voiceDropdown.addOption(
          selectedVoiceId,
          `Saved voice (${selectedVoiceId.slice(0, 8)}...)`
        );
      }

      voiceDropdown.setValue(hasSelectedVoice ? selectedVoiceId : selectedVoiceId || "");
      voiceDropdown.setDisabled(false);
    };

    const loadVoices = async (showSuccessNotice = false) => {
      if (!voiceDropdown) {
        return;
      }

      const apiKey = this.plugin.settings.elevenLabsApiKey.trim();
      if (!apiKey) {
        voiceDropdown.selectEl.innerHTML = "";
        voiceDropdown.addOption("", "Add your ElevenLabs API key first");
        voiceDropdown.setValue("");
        voiceDropdown.setDisabled(true);
        setVoiceStatus("Voice list is unavailable until an ElevenLabs API key is set.");
        return;
      }

      voiceDropdown.selectEl.innerHTML = "";
      voiceDropdown.addOption("", "Loading voices...");
      voiceDropdown.setValue("");
      voiceDropdown.setDisabled(true);
      setVoiceStatus("Loading saved voices from ElevenLabs...");
      if (refreshButtonEl) {
        refreshButtonEl.disabled = true;
      }

      try {
        const voices = await fetchElevenLabsVoices(apiKey);
        populateVoiceDropdown(voices, this.plugin.settings.elevenLabsVoiceId);

        if (voices.length === 0) {
          setVoiceStatus("No voices were returned for this ElevenLabs account.");
        } else {
          setVoiceStatus(`Loaded ${voices.length} ElevenLabs voices.`);
          if (showSuccessNotice) {
            new Notice(`Loaded ${voices.length} ElevenLabs voices.`);
          }
        }
      } catch (error) {
        voiceDropdown.selectEl.innerHTML = "";
        voiceDropdown.addOption("", "Failed to load voices");
        voiceDropdown.setValue("");
        voiceDropdown.setDisabled(true);

        const message =
          error instanceof Error
            ? error.message
            : "Unknown error while loading voices.";
        setVoiceStatus(message);
        new Notice(`Failed to load ElevenLabs voices: ${message}`, 10000);
      } finally {
        if (refreshButtonEl) {
          refreshButtonEl.disabled = false;
        }
      }
    };

    new Setting(containerEl)
      .setName("Voice")
      .setDesc("Fetched from ElevenLabs using the saved API key.")
      .addDropdown((dropdown) => {
        voiceDropdown = dropdown;
        dropdown.addOption("", "Loading...");
        dropdown.setDisabled(true);
        dropdown.onChange(async (value) => {
          this.plugin.settings.elevenLabsVoiceId = value.trim();
          await this.plugin.saveSettings();
          if (value.trim()) {
            void loadSelectedVoiceSettings(value.trim());
          }
        });
      })
      .addButton((button) => {
        button.setButtonText("Refresh").onClick(() => {
          void loadVoices(true);
        });
        refreshButtonEl = button.buttonEl;
      })
      .then((setting) => {
        voiceStatusEl = setting.descEl.createDiv({
          text: "Voice list will load from ElevenLabs.",
        });
      });

    void loadVoices();

    new Setting(containerEl)
      .setName("Model ID")
      .setDesc("Single fixed model option for now.")
      .addDropdown((dropdown) => {
        for (const option of ELEVENLABS_MODEL_OPTIONS) {
          dropdown.addOption(option.value, option.label);
        }

        dropdown.setValue(this.plugin.settings.elevenLabsModelId);
        dropdown.onChange(async (value) => {
          this.plugin.settings.elevenLabsModelId = value;
          await this.plugin.saveSettings();
        });
      });

    new Setting(containerEl)
      .setName("Audio format")
      .setDesc("Single fixed output format option for now.")
      .addDropdown((dropdown) => {
        for (const option of ELEVENLABS_OUTPUT_FORMAT_OPTIONS) {
          dropdown.addOption(option.value, option.label);
        }

        dropdown.setValue(this.plugin.settings.elevenLabsOutputFormat);
        dropdown.onChange(async (value) => {
          this.plugin.settings.elevenLabsOutputFormat = value;
          await this.plugin.saveSettings();
        });
      });

    new Setting(containerEl)
      .setName("Speed")
      .setDesc("Defaults from the selected voice, but you can override it here.")
      .addSlider((slider) => {
        speedSlider = slider;
        slider
          .setLimits(70, 120, 1)
          .setValue(
            Math.round(this.plugin.settings.elevenLabsVoiceSettings.speed * 100)
          )
          .setDynamicTooltip()
          .onChange(async (value) => {
            this.plugin.settings.elevenLabsVoiceSettings.speed = value / 100;
            await saveVoiceSettings();
          });
      });

    new Setting(containerEl)
      .setName("Stability")
      .setDesc("Higher values keep delivery more consistent.")
      .addSlider((slider) => {
        stabilitySlider = slider;
        slider
          .setLimits(0, 100, 1)
          .setValue(
            Math.round(
              this.plugin.settings.elevenLabsVoiceSettings.stability * 100
            )
          )
          .setDynamicTooltip()
          .onChange(async (value) => {
            this.plugin.settings.elevenLabsVoiceSettings.stability = value / 100;
            await saveVoiceSettings();
          });
      });

    new Setting(containerEl)
      .setName("Similarity")
      .setDesc("This maps to similarity boost in the API.")
      .addSlider((slider) => {
        similaritySlider = slider;
        slider
          .setLimits(0, 100, 1)
          .setValue(
            Math.round(
              this.plugin.settings.elevenLabsVoiceSettings.similarityBoost * 100
            )
          )
          .setDynamicTooltip()
          .onChange(async (value) => {
            this.plugin.settings.elevenLabsVoiceSettings.similarityBoost =
              value / 100;
            await saveVoiceSettings();
          });
      });

    new Setting(containerEl)
      .setName("Style Exaggeration")
      .setDesc("Defaults from the voice, but you can override it here.")
      .addSlider((slider) => {
        styleSlider = slider;
        slider
          .setLimits(0, 100, 1)
          .setValue(
            Math.round(this.plugin.settings.elevenLabsVoiceSettings.style * 100)
          )
          .setDynamicTooltip()
          .onChange(async (value) => {
            this.plugin.settings.elevenLabsVoiceSettings.style = value / 100;
            await saveVoiceSettings();
          });
      });

    new Setting(containerEl)
      .setName("Speaker Boost")
      .setDesc("Uses ElevenLabs speaker boost for closer voice matching.")
      .addToggle((toggle) => {
        speakerBoostToggle = toggle;
        toggle
          .setValue(
            this.plugin.settings.elevenLabsVoiceSettings.useSpeakerBoost
          )
          .onChange(async (value) => {
            this.plugin.settings.elevenLabsVoiceSettings.useSpeakerBoost = value;
            await saveVoiceSettings();
          });
      });

    new Setting(containerEl)
      .setName("Generate audio by default")
      .setDesc("You can still override this for each bundle in the modal.")
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.defaultGenerateAudio)
          .onChange(async (value) => {
            this.plugin.settings.defaultGenerateAudio = value;
            await this.plugin.saveSettings();
          })
      );

    containerEl.createEl("h2", { text: "Convenience Defaults" });
    new Setting(containerEl)
      .setName("Last tags")
      .setDesc("Comma-separated tags reused as modal defaults.")
      .addText((text) =>
        text
          .setPlaceholder("japanese,anki")
          .setValue(this.plugin.settings.lastTags)
          .onChange(async (value) => {
            this.plugin.settings.lastTags = value.trim();
            await this.plugin.saveSettings();
          })
      );
  }
}
