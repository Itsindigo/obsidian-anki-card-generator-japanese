import { requestUrl } from "obsidian";
import type { TranslationResult } from "./types";

interface DeepLTranslateResponse {
  translations?: Array<{
    detected_source_language?: string;
    text?: string;
    model_type_used?: string;
  }>;
  message?: string;
  detail?: {
    message?: string;
  };
}

function getDeepLEndpoint(apiKey: string): string {
  return apiKey.trim().endsWith(":fx")
    ? "https://api-free.deepl.com/v2/translate"
    : "https://api.deepl.com/v2/translate";
}

export async function translateEnglishToJapanese(
  apiKey: string,
  englishPhrase: string
): Promise<TranslationResult> {
  const response = await requestUrl({
    url: getDeepLEndpoint(apiKey),
    method: "POST",
    headers: {
      Authorization: `DeepL-Auth-Key ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: [englishPhrase],
      source_lang: "EN",
      target_lang: "JA",
    }),
    throw: false,
  });

  const payload = response.json as DeepLTranslateResponse;

  if (response.status >= 400) {
    const message =
      payload.message ??
      payload.detail?.message ??
      response.text ??
      "Translation request failed with an unknown error.";
    throw new Error(message);
  }

  const translation = payload.translations?.[0];
  if (!translation?.text) {
    throw new Error("Translation response did not include translated text.");
  }

  return {
    sourceLanguage: translation.detected_source_language ?? null,
    japanese: translation.text,
    provider: "deepl",
    model: translation.model_type_used ?? null,
  };
}
