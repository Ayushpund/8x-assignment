/**
 * 8x assignment agent capture — prompt + final response only (no tool/thinking logs).
 * Wired from .cursor/hooks.json (sessionStart, beforeSubmitPrompt, afterAgentResponse).
 */
import fs from "node:fs";
import path from "node:path";

const PROJECT = process.cwd();
const LOG_DIR = path.join(PROJECT, ".agent-logs");
const INDEX_PATH = path.join(LOG_DIR, "_sessions.json");
const AUTHOR = "Ayushpund";
const TOOL = "cursor";
const PROJECT_NAME = "8x-assignment";

function readStdin() {
  return new Promise((resolve) => {
    let data = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (c) => {
      data += c;
    });
    process.stdin.on("end", () => resolve(data));
  });
}

function utcNow() {
  return new Date().toISOString();
}

function fileStamp(d = new Date()) {
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}_${pad(d.getUTCHours())}-${pad(d.getUTCMinutes())}-${pad(d.getUTCSeconds())}`;
}

function shortId(id) {
  if (!id || typeof id !== "string") return "unknown";
  return id.split("-")[0] ?? id.slice(0, 8);
}

function ensureDir() {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

function loadIndex() {
  ensureDir();
  if (!fs.existsSync(INDEX_PATH)) return {};
  try {
    return JSON.parse(fs.readFileSync(INDEX_PATH, "utf8"));
  } catch {
    return {};
  }
}

function saveIndex(index) {
  fs.writeFileSync(INDEX_PATH, JSON.stringify(index, null, 2), "utf8");
}

function parseFrontmatter(content) {
  const m = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return { meta: {}, body: content };
  const meta = {};
  for (const line of m[1].split("\n")) {
    const i = line.indexOf(":");
    if (i === -1) continue;
    meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return { meta, body: content.slice(m[0].length) };
}

function stringifyFrontmatter(meta) {
  const lines = ["---"];
  for (const [k, v] of Object.entries(meta)) {
    lines.push(`${k}: ${v}`);
  }
  lines.push("---");
  return lines.join("\n");
}

function updateFrontmatter(filePath, patch) {
  const raw = fs.readFileSync(filePath, "utf8");
  const { meta, body } = parseFrontmatter(raw);
  Object.assign(meta, patch);
  fs.writeFileSync(filePath, `${stringifyFrontmatter(meta)}\n${body}`, "utf8");
}

function createSessionFile(sessionId, composerMode) {
  const stamp = fileStamp();
  const sid = shortId(sessionId);
  const fileName = `${stamp}_${sid}.md`;
  const filePath = path.join(LOG_DIR, fileName);
  const now = utcNow();
  const meta = {
    session_id: sessionId,
    date: now.slice(0, 10),
    author: AUTHOR,
    model: "unknown",
    tool: TOOL,
    project: PROJECT_NAME,
    total_exchanges: "0",
    first_prompt_time: "",
    last_prompt_time: "",
    composer_mode: composerMode ?? "agent",
  };
  const header = `${stringifyFrontmatter(meta)}

# Session Log - ${meta.date}

Session: \`${sid}\` | Project: \`${PROJECT_NAME}\` | Author: \`${AUTHOR}\`

---

`;
  fs.writeFileSync(filePath, header, "utf8");
  return filePath;
}

function getOrCreateLog(index, conversationId, sessionId, composerMode) {
  if (index[conversationId]?.logPath && fs.existsSync(index[conversationId].logPath)) {
    return index[conversationId].logPath;
  }
  const id = sessionId || conversationId || crypto.randomUUID();
  const logPath = createSessionFile(id, composerMode);
  index[conversationId || id] = {
    logPath,
    sessionId: id,
    exchangeCount: 0,
    pending: {},
  };
  saveIndex(index);
  return logPath;
}

function appendBlock(filePath, block) {
  fs.appendFileSync(filePath, block, "utf8");
}

async function main() {
  const raw = await readStdin();
  if (!raw.trim()) process.exit(0);

  let payload;
  try {
    payload = JSON.parse(raw);
  } catch {
    process.exit(0);
  }

  const event = payload.hook_event_name ?? "";
  const conversationId =
    payload.conversation_id ?? payload.session_id ?? "";
  const generationId = payload.generation_id ?? "";
  const model =
    payload.model ?? payload.model_id ?? payload.provider ?? "unknown";

  const index = loadIndex();

  if (event === "sessionStart") {
    const sessionId = payload.session_id ?? conversationId;
    if (!sessionId) process.exit(0);
    getOrCreateLog(index, sessionId, sessionId, payload.composer_mode);
    process.exit(0);
  }

  if (event === "beforeSubmitPrompt") {
    const prompt = payload.prompt ?? "";
    if (!conversationId) process.exit(0);
    const logPath = getOrCreateLog(
      index,
      conversationId,
      conversationId,
      payload.composer_mode
    );
    const rec = index[conversationId];
    rec.exchangeCount = (rec.exchangeCount ?? 0) + 1;
    const num = rec.exchangeCount;
    const ts = utcNow();
    rec.pending = rec.pending ?? {};
    rec.pending[generationId || `turn-${num}`] = {
      num,
      ts,
      model,
      prompt,
    };
    saveIndex(index);

    appendBlock(
      logPath,
      `
[LOG_ENTRY type=PROMPT num=${num} session=${shortId(rec.sessionId ?? conversationId)}]
timestamp: ${ts}
model: ${model}

${prompt}

`
    );

    const fm = { last_prompt_time: ts };
    if (num === 1) fm.first_prompt_time = ts;
    fm.total_exchanges = String(num);
    fm.model = model;
    updateFrontmatter(logPath, fm);

    console.log(JSON.stringify({ continue: true }));
    process.exit(0);
  }

  if (event === "afterAgentResponse") {
    const text = payload.text ?? "";
    if (!conversationId) process.exit(0);
    const rec = index[conversationId];
    if (!rec?.logPath || !fs.existsSync(rec.logPath)) process.exit(0);

    const key = generationId || Object.keys(rec.pending ?? {}).pop();
    const pending = rec.pending?.[key];
    const num = pending?.num ?? rec.exchangeCount ?? "?";
    const ts = utcNow();

    appendBlock(
      rec.logPath,
      `
[LOG_ENTRY type=RESPONSE num=${num} session=${shortId(rec.sessionId ?? conversationId)}]
timestamp: ${ts}
model: ${model}

${text}

`
    );

    if (key && rec.pending) delete rec.pending[key];
    saveIndex(index);
    process.exit(0);
  }

  process.exit(0);
}

main().catch(() => process.exit(0));
