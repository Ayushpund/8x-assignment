/** Redact secrets in .agent-logs/*.md (run before commit/push). */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const logDir = path.join(root, ".agent-logs");

function redact(text) {
  return text
    .replace(/AIza[A-Za-z0-9_-]{20,}/g, "[REDACTED-GOOGLE-API-KEY]")
    .replace(/github_pat_[A-Za-z0-9_]+/g, "[REDACTED-GITHUB-TOKEN]")
    .replace(/\bghp_[A-Za-z0-9]+\b/g, "[REDACTED-GITHUB-TOKEN]")
    .replace(/\bcfsk_[A-Za-z0-9_]+\b/g, "[REDACTED-CASHFREE-SECRET]")
    .replace(/\bTEST[0-9a-f]{32,}\b/gi, "[REDACTED-CASHFREE-APP-ID]");
}

if (!fs.existsSync(logDir)) process.exit(0);

for (const name of fs.readdirSync(logDir)) {
  if (!name.endsWith(".md") || name === "README.md") continue;
  const p = path.join(logDir, name);
  const next = redact(fs.readFileSync(p, "utf8"));
  fs.writeFileSync(p, next, "utf8");
  console.log("scrubbed", name);
}
