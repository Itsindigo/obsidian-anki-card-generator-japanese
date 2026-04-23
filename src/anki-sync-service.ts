import {
  addAnkiNote,
  canAddAnkiNote,
  getAnkiConnectVersion,
  getAnkiDeckNames,
  storeAnkiMediaFile,
  type AnkiConnectNoteInput,
} from "./ankiconnect";
import type { AnkiSyncPayload, BundleRecord } from "./types";

function trimAnkiConnectUrl(baseUrl: string): string {
  return baseUrl.trim();
}

export function buildAnkiSyncPayload(
  record: BundleRecord,
  deckNameOverride?: string | null,
  fallbackDeckName?: string | null
): AnkiSyncPayload {
  const deckName =
    deckNameOverride ?? record.export.deckName ?? fallbackDeckName ?? null;
  if (!deckName) {
    throw new Error(
      "No deck name is set in the bundle and no deck override or last used deck was available."
    );
  }

  return {
    deckName,
    noteType: record.export.noteType,
    fields: {
      Front: record.export.fields.Front,
      Back: record.export.fields.Back,
    },
    tags: record.export.tags,
    audioFileName: record.audio.fileName,
  };
}

export class AnkiSyncService {
  private constructor(
    private readonly baseUrl: string,
    private readonly deckNames: Set<string>
  ) {}

  static async connect(baseUrl: string): Promise<AnkiSyncService> {
    const trimmedUrl = trimAnkiConnectUrl(baseUrl);
    if (!trimmedUrl) {
      throw new Error("Set an AnkiConnect URL in plugin settings before syncing.");
    }

    await getAnkiConnectVersion(trimmedUrl);
    const deckNames = new Set(await getAnkiDeckNames(trimmedUrl));
    return new AnkiSyncService(trimmedUrl, deckNames);
  }

  async sync(
    payload: AnkiSyncPayload,
    audioBytes: Buffer | null = null
  ): Promise<number> {
    if (!this.deckNames.has(payload.deckName)) {
      throw new Error(`Deck "${payload.deckName}" was not found in Anki.`);
    }

    const note: AnkiConnectNoteInput = {
      deckName: payload.deckName,
      modelName: payload.noteType,
      fields: payload.fields,
      tags: payload.tags,
    };

    const canAdd = await canAddAnkiNote(this.baseUrl, note);
    if (!canAdd) {
      throw new Error(
        "Anki rejected this note. It may already exist, or the selected note type may not match the fields."
      );
    }

    if (payload.audioFileName && audioBytes) {
      await storeAnkiMediaFile(
        this.baseUrl,
        payload.audioFileName,
        audioBytes.toString("base64")
      );
    }

    return addAnkiNote(this.baseUrl, note);
  }
}
