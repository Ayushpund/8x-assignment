import { rmSync, existsSync } from "node:fs";

import { spawn, execSync } from "node:child_process";

import path from "node:path";

import { fileURLToPath } from "node:url";



const PORT = process.env.PORT || "3000";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

const nextDir = path.join(root, ".next");
const nextCache = path.join(root, "node_modules", ".cache");



function killProcessOnPort(port) {

  if (process.platform === "win32") {

    try {

      const out = execSync(`netstat -ano -p tcp | findstr :${port}`, {

        encoding: "utf8",

        stdio: ["pipe", "pipe", "ignore"],

      });

      const pids = new Set();

      for (const line of out.split(/\r?\n/)) {

        const trimmed = line.trim();

        if (!trimmed.includes("LISTENING")) continue;

        const parts = trimmed.split(/\s+/);

        const pid = parts[parts.length - 1];

        if (pid && /^\d+$/.test(pid)) pids.add(pid);

      }

      for (const pid of pids) {

        if (pid === String(process.pid)) continue;

        console.log(`[dev] Stopping stale process on port ${port} (PID ${pid})...`);

        try {

          execSync(`taskkill /F /PID ${pid}`, { stdio: "ignore" });

        } catch {

          /* already gone */

        }

      }

    } catch {

      /* nothing listening */

    }

    return;

  }



  try {

    execSync(`lsof -ti:${port} | xargs kill -9 2>/dev/null`, {

      stdio: "ignore",

      shell: true,

    });

  } catch {

    /* ignore */

  }

}



killProcessOnPort(PORT);

// Stale `next build` + dev together causes missing vendor-chunks (e.g. @radix-ui.js).
console.log("[dev] Tip: do not run `npm run start` or `next build` while dev is open.");

// Production build artifacts break dev CSS (layout.css 404). Always reset for dev.

function removePath(dir, label) {
  if (!existsSync(dir)) return;
  console.log(`[dev] Removing ${label}...`);
  rmSync(dir, {
    recursive: true,
    force: true,
    maxRetries: 8,
    retryDelay: 250,
  });
}

removePath(nextDir, ".next for a clean dev bundle");
removePath(nextCache, "node_modules/.cache");



const nextBin = path.join(root, "node_modules", "next", "dist", "bin", "next");



console.log(`[dev] Starting Next.js on http://localhost:${PORT}`);
console.log(
  "[dev] Styles load from /_next/static/css — if the page looks unstyled, hard-refresh (Ctrl+Shift+R).",
);
console.log(
  "[dev] On Windows PowerShell, if npm is blocked, run: node scripts/dev.mjs  or double-click dev.cmd",
);



const child = spawn(
  process.execPath,
  [nextBin, "dev", "-p", PORT],
  {
    cwd: root,
    stdio: "inherit",
    env: {
      ...process.env,
      /** Avoid stale webpack cache mixing with a fresh .next (vendor-chunks / ChunkLoadError). */
      NEXT_DISABLE_WEBPACK_CACHE: "1",
    },
  },
);



child.on("exit", (code) => process.exit(code ?? 0));

