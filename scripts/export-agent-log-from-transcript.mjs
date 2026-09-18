/**
 * Build .agent-logs session file from Cursor agent-transcripts JSONL.
 * Exports user prompts + last assistant text per turn (no tool calls).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const sessionId = process.argv[2] ?? "e65c822d-309d-4f80-83fb-947b669fe7d1";
const transcriptPath =
  process.argv[3] ??
  path.join(
    process.env.CURSOR_PROJECT_DIR ??
      path.join(process.env.USERPROFILE ?? "", ".cursor", "projects", "d-8x-assignment"),
    "agent-transcripts",
    sessionId,
    `${sessionId}.jsonl`
  );

function redactSecrets(text) {
  return text
    .replace(/AIza[A-Za-z0-9_-]{20,}/g, "[REDACTED-GOOGLE-API-KEY]")
    .replace(/github_pat_[A-Za-z0-9_]+/g, "[REDACTED-GITHUB-TOKEN]")
    .replace(/\bghp_[A-Za-z0-9]+\b/g, "[REDACTED-GITHUB-TOKEN]")
    .replace(/\bcfsk_ma_test_[A-Za-z0-9_]+\b/g, "[REDACTED-CASHFREE-SECRET]")
    .replace(/\bcfsk_[A-Za-z0-9_]+\b/g, "[REDACTED-CASHFREE-SECRET]")
    .replace(/\bTEST[0-9a-f]{32,}\b/gi, "[REDACTED-CASHFREE-APP-ID]")
    .replace(/pass is \S+/gi, "pass is [REDACTED-PASSWORD]");
}

function extractUserText(row) {
  const parts = row.message?.content ?? [];
  let text = "";
  for (const p of parts) {
    if (p.type === "text" && p.text) text += p.text;
  }
  const q = text.match(/<user_query>\s*([\s\S]*?)<\/user_query>/i);
  if (q) return redactSecrets(q[1].trim());
  return redactSecrets(text.trim());
}

function extractTimestamp(row) {
  const parts = row.message?.content ?? [];
  for (const p of parts) {
    if (p.type !== "text" || !p.text) continue;
    const m = p.text.match(/<timestamp>([^<]+)<\/timestamp>/i);
    if (m) return m[1].trim();
  }
  return null;
}

function assistantText(row) {
  const parts = row.message?.content ?? [];
  let text = "";
  for (const p of parts) {
    if (p.type === "text" && p.text) text += p.text;
  }
  return redactSecrets(text.replace(/\n?\[REDACTED\]\n?/g, "").trim());
}

function finalResponse(assistantRows) {
  for (let i = assistantRows.length - 1; i >= 0; i--) {
    const t = assistantText(assistantRows[i]);
    if (t.length > 0) return t;
  }
  return "";
}

function parseTurns(lines) {
  const turns = [];
  let userText = null;
  let userTs = null;
  let assistants = [];

  const flush = () => {
    if (userText == null) return;
    turns.push({
      prompt: userText,
      promptTime: userTs,
      response: finalResponse(assistants),
    });
    userText = null;
    userTs = null;
    assistants = [];
  };

  for (const line of lines) {
    if (!line.trim()) continue;
    let row;
    try {
      row = JSON.parse(line);
    } catch {
      continue;
    }
    if (row.role === "user") {
      flush();
      userText = extractUserText(row);
      userTs = extractTimestamp(row);
      assistants = [];
    } else if (row.role === "assistant") {
      assistants.push(row);
    }
  }
  flush();
  return turns.filter((t) => t.prompt.length > 0);
}

function toUtcIso(displayTs) {
  if (!displayTs) return new Date().toISOString();
  const d = new Date(displayTs);
  return Number.isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
}

function main() {
  if (!fs.existsSync(transcriptPath)) {
    console.error("Transcript not found:", transcriptPath);
    process.exit(1);
  }
  const lines = fs.readFileSync(transcriptPath, "utf8").split(/\r?\n/);
  const turns = parseTurns(lines);
  const sid = sessionId.split("-")[0];
  const first = turns[0]?.promptTime;
  const last = turns[turns.length - 1]?.promptTime;
  const firstIso = toUtcIso(first);
  const lastIso = toUtcIso(last);
  const date = firstIso.slice(0, 10);
  const stamp = firstIso.replace(/[:.]/g, "-").slice(0, 19).replace("T", "_");

  const logDir = path.join(root, ".agent-logs");
  fs.mkdirSync(logDir, { recursive: true });
  const outPath = path.join(logDir, `${stamp}_${sid}.md`);

  const header = `---
session_id: ${sessionId}
date: ${date}
author: Ayushpund
model: cursor-composer-agent
tool: cursor
project: 8x-assignment
total_exchanges: ${turns.length}
first_prompt_time: ${firstIso}
last_prompt_time: ${lastIso}
source: exported from Cursor agent-transcript JSONL (prompt + final response per turn)
---

# Session Log - ${date}

Session: \`${sid}\` | Project: \`8x-assignment\` | Author: \`Ayushpund\`

---

`;

  let body = "";
  turns.forEach((turn, i) => {
    const num = i + 1;
    const pts = toUtcIso(turn.promptTime);
    const rts = pts;
    body += `
[LOG_ENTRY type=PROMPT num=${num} session=${sid}]
timestamp: ${pts}
model: cursor-composer-agent

${turn.prompt}


[LOG_ENTRY type=RESPONSE num=${num} session=${sid}]
timestamp: ${rts}
model: cursor-composer-agent

${turn.response || "(No final text captured for this turn in transcript.)"}

`;
  });

  fs.writeFileSync(outPath, header + body, "utf8");
  console.log(`Wrote ${turns.length} exchanges to ${outPath}`);
}

main();
