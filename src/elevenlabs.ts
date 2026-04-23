import { requestUrl } from "obsidian";
import type { ElevenLabsVoiceSettings } from "./types";

export interface ElevenLabsVoiceSummary {
  voiceId: string;
  name: string;
  category: string | null;
  description: string | null;
}

interface ElevenLabsVoiceSettingsResponse {
  stability?: number | null;
  similarity_boost?: number | null;
  style?: number | null;
  speed?: number | null;
  use_speaker_boost?: boolean | null;
  detail?: {
    message?: string;
  };
}

interface ElevenLabsVoicesResponse {
  voices?: Array<{
    voice_id?: string;
    name?: string;
    category?: string;
    description?: string | null;
  }>;
  has_more?: boolean;
  next_page_token?: string | null;
  detail?: {
    message?: string;
  };
}

function buildVoicesUrl(nextPageToken?: string | null): string {
  const url = new URL("https://api.elevenlabs.io/v2/voices");
  url.searchParams.set("page_size", "100");
  url.searchParams.set("sort", "name");
  url.searchParams.set("sort_direction", "asc");
  url.searchParams.set("include_total_count", "false");

  if (nextPageToken) {
    url.searchParams.set("next_page_token", nextPageToken);
  }

  return url.toString();
}

export async function fetchElevenLabsVoices(
  apiKey: string
): Promise<ElevenLabsVoiceSummary[]> {
  const voices: ElevenLabsVoiceSummary[] = [];
  let nextPageToken: string | null = null;

  do {
    const response = await requestUrl({
      url: buildVoicesUrl(nextPageToken),
      method: "GET",
      headers: {
        "xi-api-key": apiKey,
      },
      throw: false,
    });

    const payload = response.json as ElevenLabsVoicesResponse;
    if (response.status >= 400) {
      const message =
        payload.detail?.message ??
        response.text ??
        "Failed to fetch ElevenLabs voices.";
      throw new Error(message);
    }

    for (const voice of payload.voices ?? []) {
      if (!voice.voice_id || !voice.name) {
        continue;
      }

      voices.push({
        voiceId: voice.voice_id,
        name: voice.name,
        category: voice.category ?? null,
        description: voice.description ?? null,
      });
    }

    nextPageToken =
      payload.has_more && payload.next_page_token
        ? payload.next_page_token
        : null;
  } while (nextPageToken);

  return voices;
}

export async function fetchElevenLabsVoiceSettings(
  apiKey: string,
  voiceId: string
): Promise<ElevenLabsVoiceSettings> {
  const response = await requestUrl({
    url: `https://api.elevenlabs.io/v1/voices/${encodeURIComponent(voiceId)}/settings`,
    method: "GET",
    headers: {
      "xi-api-key": apiKey,
    },
    throw: false,
  });

  const payload = response.json as ElevenLabsVoiceSettingsResponse;
  if (response.status >= 400) {
    const message =
      payload.detail?.message ??
      response.text ??
      "Failed to fetch ElevenLabs voice settings.";
    throw new Error(message);
  }

  return {
    speed: payload.speed ?? 1,
    stability: payload.stability ?? 0.5,
    similarityBoost: payload.similarity_boost ?? 0.75,
    style: payload.style ?? 0,
    useSpeakerBoost: payload.use_speaker_boost ?? true,
  };
}
