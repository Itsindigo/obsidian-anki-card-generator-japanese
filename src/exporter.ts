import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import type {
  AudioResult,
  BundleRecord,
  BundleWriteResult,
  GenerateBundleInput,
  ReadingResult,
  TranslationResult,
} from "./types";

function escapeYamlString(value: string): string {
  return JSON.stringify(value);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function slugify(input: string): string {
  const slug = input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  if (slug) {
    return slug;
  }

  const date = new Date().toISOString().replace(/[:.]/g, "-");
  return `card-${date}`;
}

function buildFrontField(
  japanese: string,
  romaji: string,
  audioFileName: string | null
): string {
  const parts = [
    `<pre style="text-align: center;">${escapeHtml(japanese)}</pre>`,
    `<pre style="text-align: center;">${escapeHtml(romaji)}</pre>`,
  ];

  if (audioFileName) {
    parts.push(
      `<div style="text-align: center;">[sound:${escapeHtml(audioFileName)}]</div>`
    );
  }

  return parts.join("");
}

function buildBackField(english: string): string {
  return escapeHtml(english);
}

function buildMarkdown(
  record: BundleRecord,
  audioEmbedPath: string | null
): string {
  const tagsSection =
    record.export.tags.length > 0
      ? ["tags:", ...record.export.tags.map((tag) => `  - ${tag}`)].join("\n")
      : "tags: []";
  const audioSection = audioEmbedPath
    ? `## Audio\n\n![[${audioEmbedPath}]]\n`
    : "## Audio\n\nAudio generation was disabled for this bundle.\n";

  return [
    "---",
    `type: ${escapeYamlString("japanese-anki-bundle")}`,
    `created_at: ${escapeYamlString(record.createdAt)}`,
    `deck_name: ${escapeYamlString(record.export.deckName ?? "")}`,
    tagsSection,
    `english: ${escapeYamlString(record.source.english)}`,
    `japanese: ${escapeYamlString(record.japanese.text)}`,
    `hiragana: ${escapeYamlString(record.japanese.hiragana)}`,
    `katakana: ${escapeYamlString(record.japanese.katakana)}`,
    `romaji: ${escapeYamlString(record.japanese.romaji)}`,
    `audio_path: ${escapeYamlString(record.audio.relativePath ?? "")}`,
    "---",
    "",
    "# Japanese Anki Bundle",
    "",
    "## Source",
    "",
    `- English: ${record.source.english}`,
    `- Japanese: ${record.japanese.text}`,
    `- Hiragana: ${record.japanese.hiragana}`,
    `- Katakana: ${record.japanese.katakana}`,
    `- Romaji: ${record.japanese.romaji}`,
    `- Deck hint: ${record.export.deckName ?? "Not set"}`,
    "",
    audioSection,
    "## Export Fields",
    "",
    "```json",
    JSON.stringify(record.export, null, 2),
    "```",
    "",
  ].join("\n");
}

export async function writeBundleFiles(params: {
  input: GenerateBundleInput;
  translation: TranslationResult;
  readings: ReadingResult;
  audio: AudioResult | null;
}): Promise<BundleWriteResult> {
  const { input, translation, readings, audio } = params;
  const outputDirectory = path.resolve(input.outputDirectory);
  const mediaDirectory = path.join(outputDirectory, "media");
  const baseName = slugify(input.noteSlug || input.englishPhrase);
  const notePath = path.join(outputDirectory, `${baseName}.md`);
  const jsonPath = path.join(outputDirectory, `${baseName}.bundle.json`);
  const audioFileName = audio ? `${baseName}-ja.${audio.extension}` : null;
  const audioPath = audioFileName
    ? path.join(mediaDirectory, audioFileName)
    : null;
  const audioRelativePath = audioFileName
    ? path.posix.join("media", audioFileName)
    : null;

  await mkdir(outputDirectory, { recursive: true });
  if (audio) {
    await mkdir(mediaDirectory, { recursive: true });
    await writeFile(audioPath as string, audio.bytes);
  }

  const record: BundleRecord = {
    schemaVersion: 1,
    createdAt: new Date().toISOString(),
    source: {
      english: input.englishPhrase,
      detectedLanguage: translation.sourceLanguage,
    },
    japanese: {
      text: translation.japanese,
      hiragana: readings.hiragana,
      katakana: readings.katakana,
      romaji: readings.romaji,
    },
    audio: {
      enabled: Boolean(audio),
      fileName: audioFileName,
      relativePath: audioRelativePath,
      provider: audio?.provider ?? null,
      voiceId: audio?.voiceId ?? null,
      modelId: audio?.modelId ?? null,
      outputFormat: audio?.outputFormat ?? null,
    },
    export: {
      deckName: input.deckName,
      tags: input.tags,
      noteType: "Basic (and reversed card)",
      fields: {
        Front: buildFrontField(
          translation.japanese,
          readings.romaji,
          audioFileName
        ),
        Back: buildBackField(input.englishPhrase),
        Japanese: translation.japanese,
        Hiragana: readings.hiragana,
        Romaji: readings.romaji,
        Audio: audioFileName ? `[sound:${audioFileName}]` : "",
      },
    },
    providers: {
      translation: translation.provider,
      audio: audio?.provider ?? null,
    },
  };

  await writeFile(jsonPath, JSON.stringify(record, null, 2), "utf8");
  await writeFile(
    notePath,
    buildMarkdown(record, audioRelativePath),
    "utf8"
  );

  return {
    notePath,
    jsonPath,
    audioPath,
    record,
  };
}
