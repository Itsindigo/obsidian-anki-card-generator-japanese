import { requestUrl } from "obsidian";
import type { AudioResult, JapaneseAnkiSettings } from "./types";

function extensionFromFormat(outputFormat: string): string {
  const [codec] = outputFormat.split("_");

  switch (codec) {
    case "mp3":
      return "mp3";
    case "wav":
      return "wav";
    case "opus":
      return "opus";
    case "pcm":
      return "pcm";
    case "ulaw":
      return "ulaw";
    case "alaw":
      return "alaw";
    default:
      return "bin";
  }
}

export async function synthesizeJapaneseAudio(
  settings: JapaneseAnkiSettings,
  japaneseText: string
): Promise<AudioResult> {
  const voiceId = settings.elevenLabsVoiceId.trim();
  if (!voiceId) {
    throw new Error("Set an ElevenLabs voice ID in plugin settings.");
  }

  const url =
    `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(voiceId)}` +
    `?output_format=${encodeURIComponent(settings.elevenLabsOutputFormat)}`;
  const response = await requestUrl({
    url,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "xi-api-key": settings.elevenLabsApiKey,
    },
    body: JSON.stringify({
      text: japaneseText,
      model_id: settings.elevenLabsModelId,
      language_code: "ja",
      apply_language_text_normalization: true,
      voice_settings: {
        speed: settings.elevenLabsVoiceSettings.speed,
        stability: settings.elevenLabsVoiceSettings.stability,
        similarity_boost: settings.elevenLabsVoiceSettings.similarityBoost,
        style: settings.elevenLabsVoiceSettings.style,
        use_speaker_boost: settings.elevenLabsVoiceSettings.useSpeakerBoost,
      },
    }),
    throw: false,
  });

  if (response.status >= 400) {
    throw new Error(response.text || "ElevenLabs request failed.");
  }

  return {
    bytes: Buffer.from(response.arrayBuffer),
    extension: extensionFromFormat(settings.elevenLabsOutputFormat),
    provider: "elevenlabs",
    voiceId,
    modelId: settings.elevenLabsModelId,
    outputFormat: settings.elevenLabsOutputFormat,
  };
}
