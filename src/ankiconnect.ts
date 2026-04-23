import { requestUrl } from "obsidian";
import type { AnkiNoteType } from "./types";

interface AnkiConnectResponse<T> {
  result: T;
  error: string | null;
}

export interface AnkiConnectNoteInput {
  deckName: string;
  modelName: AnkiNoteType;
  fields: {
    Front: string;
    Back: string;
  };
  tags: string[];
}

function normalizeEndpoint(baseUrl: string): string {
  return baseUrl.trim().replace(/\/+$/, "");
}

async function invokeAnkiConnect<T>(
  baseUrl: string,
  action: string,
  params?: Record<string, unknown>
): Promise<T> {
  const response = await requestUrl({
    url: normalizeEndpoint(baseUrl),
    method: "POST",
    contentType: "application/json",
    body: JSON.stringify({
      action,
      version: 5,
      params,
    }),
  });

  const data = response.json as AnkiConnectResponse<T>;
  if (data.error) {
    throw new Error(data.error);
  }

  return data.result;
}

export async function getAnkiConnectVersion(baseUrl: string): Promise<number> {
  return invokeAnkiConnect<number>(baseUrl, "version");
}

export async function getAnkiDeckNames(baseUrl: string): Promise<string[]> {
  return invokeAnkiConnect<string[]>(baseUrl, "deckNames");
}

export async function canAddAnkiNote(
  baseUrl: string,
  note: AnkiConnectNoteInput
): Promise<boolean> {
  const result = await invokeAnkiConnect<boolean[]>(baseUrl, "canAddNotes", {
    notes: [note],
  });

  return Boolean(result[0]);
}

export async function storeAnkiMediaFile(
  baseUrl: string,
  fileName: string,
  data: string
): Promise<string> {
  return invokeAnkiConnect<string>(baseUrl, "storeMediaFile", {
    filename: fileName,
    data,
  });
}

export async function addAnkiNote(
  baseUrl: string,
  note: AnkiConnectNoteInput
): Promise<number> {
  return invokeAnkiConnect<number>(baseUrl, "addNote", { note });
}
