# Never commit or paste API keys

Google **disables** Gemini keys that appear in public GitHub repos, chat logs, or screenshots.

## If you see “API key was reported as leaked”

1. Open [Google AI Studio → API keys](https://aistudio.google.com/apikey).
2. **Delete** the old key.
3. Create a **new** key.
4. Put it **only** in `.env.local` (never in chat, never in `.agent-logs/`).

## This repo

- `.env.local` is gitignored — keep all secrets there.
- `.agent-logs/` is **public** on GitHub — prompts/responses only; keys are redacted on export.
- Before push: `node scripts/scrub-agent-logs.mjs`

## Firebase / Cashfree

Rotate any key that was ever pasted in chat or pushed to GitHub.
