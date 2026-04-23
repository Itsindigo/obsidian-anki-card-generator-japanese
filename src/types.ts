export type RomajiSystem = "hepburn" | "passport" | "nippon";
export type AnkiNoteType = "Basic" | "Basic (and reversed card)";

export interface ElevenLabsVoiceSettings {
  speed: number;
  stability: number;
  similarityBoost: number;
  style: number;
  useSpeakerBoost: boolean;
}

export interface AnkiNoteFields {
  Front: string;
  Back: string;
}

export interface AnkiSyncPayload {
  deckName: string;
  noteType: AnkiNoteType;
  fields: AnkiNoteFields;
  tags: string[];
  audioFileName: string | null;
}

export interface JapaneseAnkiSettings {
  deepLApiKey: string;
  ankiConnectUrl: string;
  defaultSyncToAnki: boolean;
  lastDeckName: string;
  elevenLabsApiKey: string;
  elevenLabsVoiceId: string;
  elevenLabsModelId: string;
  elevenLabsOutputFormat: string;
  elevenLabsVoiceSettings: ElevenLabsVoiceSettings;
  romajiSystem: RomajiSystem;
  defaultGenerateAudio: boolean;
  lastOutputDirectory: string;
  lastTags: string;
}

export interface GenerateBundleInput {
  englishPhrase: string;
  outputDirectory: string;
  deckName: string | null;
  tags: string[];
  noteSlug: string;
  generateAudio: boolean;
  syncToAnki: boolean;
}

export interface ExportBundlesInput {
  directory: string;
  deckNameOverride: string | null;
}

export interface TranslationResult {
  sourceLanguage: string | null;
  japanese: string;
  provider: "deepl";
  model: string | null;
}

export interface ReadingResult {
  hiragana: string;
  katakana: string;
  romaji: string;
}

export interface AudioResult {
  bytes: Buffer;
  extension: string;
  provider: "elevenlabs";
  voiceId: string;
  modelId: string;
  outputFormat: string;
}

export interface BundleRecord {
  schemaVersion: number;
  createdAt: string;
  source: {
    english: string;
    detectedLanguage: string | null;
  };
  japanese: {
    text: string;
    hiragana: string;
    katakana: string;
    romaji: string;
  };
  audio: {
    enabled: boolean;
    fileName: string | null;
    relativePath: string | null;
    provider: "elevenlabs" | null;
    voiceId: string | null;
    modelId: string | null;
    outputFormat: string | null;
  };
  export: {
    deckName: string | null;
    tags: string[];
    noteType: AnkiNoteType;
    fields: {
      Front: string;
      Back: string;
      Japanese: string;
      Hiragana: string;
      Romaji: string;
      Audio: string;
    };
  };
  providers: {
    translation: "deepl";
    audio: "elevenlabs" | null;
  };
}

export interface BundleWriteResult {
  notePath: string;
  jsonPath: string;
  audioPath: string | null;
  record: BundleRecord;
}
