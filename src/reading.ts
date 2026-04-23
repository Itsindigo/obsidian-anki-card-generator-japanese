import fs from "node:fs";
import path from "node:path";
import Kuroshiro from "kuroshiro";
import KuromojiAnalyzer from "kuroshiro-analyzer-kuromoji";
import type { ReadingResult, RomajiSystem } from "./types";

let kuroshiroPromise: Promise<Kuroshiro> | null = null;
let cachedInstallDir: string | null = null;

function resolveDictPath(pluginInstallDir?: string): string {
  const candidates = [
    pluginInstallDir ? path.join(pluginInstallDir, "dict") : "",
    path.join(__dirname, "dict"),
    path.join(__dirname, "node_modules", "kuromoji", "dict"),
  ].filter(Boolean);

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  throw new Error(
    `Kuromoji dictionary files are missing. Checked: ${candidates.join(", ")}`
  );
}

async function getKuroshiro(): Promise<Kuroshiro> {
  if (!kuroshiroPromise) {
    const kuroshiro = new Kuroshiro();
    const analyzer = new KuromojiAnalyzer({
      dictPath: resolveDictPath(cachedInstallDir ?? undefined),
    });

    kuroshiroPromise = kuroshiro.init(analyzer).then(() => kuroshiro);
  }

  return kuroshiroPromise;
}

export async function buildReadings(
  japaneseText: string,
  romajiSystem: RomajiSystem,
  pluginInstallDir?: string
): Promise<ReadingResult> {
  if (pluginInstallDir) {
    cachedInstallDir = pluginInstallDir;
  }

  const kuroshiro = await getKuroshiro();

  return {
    hiragana: await kuroshiro.convert(japaneseText, {
      to: "hiragana",
    }),
    katakana: await kuroshiro.convert(japaneseText, {
      to: "katakana",
    }),
    romaji: await kuroshiro.convert(japaneseText, {
      to: "romaji",
      mode: "spaced",
      romajiSystem,
    }),
  };
}
