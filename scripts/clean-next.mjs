import { rmSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

function removePath(rel) {
  const target = path.join(root, rel);
  if (!existsSync(target)) return;
  console.log(`[clean] Removing ${rel}...`);
  rmSync(target, {
    recursive: true,
    force: true,
    maxRetries: 8,
    retryDelay: 250,
  });
}

for (const rel of [".next", "node_modules/.cache"]) {
  removePath(rel);
}

console.log("[clean] Done. Start dev with: node scripts/dev.mjs");
