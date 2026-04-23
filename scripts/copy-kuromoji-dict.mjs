import { cp, mkdir, access } from "node:fs/promises";
import path from "node:path";

const rootDir = process.cwd();
const sourceDir = path.join(rootDir, "node_modules", "kuromoji", "dict");
const targetDir = path.join(rootDir, "dict");

try {
  await access(sourceDir);
} catch {
  console.warn("Skipping kuromoji dictionary copy because the source folder is missing.");
  process.exit(0);
}

await mkdir(targetDir, { recursive: true });
await cp(sourceDir, targetDir, { recursive: true });
console.log(`Copied kuromoji dictionary to ${targetDir}`);
