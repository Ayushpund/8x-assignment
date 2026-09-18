# 8x Studio (Higgsfield-style clone)

Next.js 14 creative studio with marketing pages, API console, Create Studio, and Gemini image generation.

## Run locally (Windows)

```powershell
cd "d:\8x assignment"
node ./scripts/dev.mjs
```

Or double-click `dev.cmd`. Open [http://localhost:3000](http://localhost:3000).

If styles look broken, hard refresh (Ctrl+Shift+R). Do not run `build` and `dev` at the same time.

## Environment

Copy `.env.example` to `.env.local`:

```
GEMINI_API_KEY=your_google_ai_studio_key
```

Without a key, `POST /api/generate` returns **demo SVG placeholders** (UI still works).

## Deploy (Vercel)

1. Push the repo to GitHub.
2. Import in Vercel, framework **Next.js**.
3. Set environment variable `GEMINI_API_KEY` in project settings.
4. Deploy. Use `GET /api/health` as an optional health check.

Production start (after build):

```powershell
npm run build
npm run start
```

## Main routes

| Route | Purpose |
|-------|---------|
| `/` | Home (video hero, MCP, VFX) |
| `/create` | Image generation studio |
| `/api-product`, `/explore` | API model catalog |
| `/gallery` | Saved generations |
| `/docs` | API docs |
| `/login`, `/signup` | Local auth (prototype) |

## API

- `GET /api/health` — deploy probe, Gemini configured or demo mode
- `POST /api/generate` — `{ prompt, aspectRatio, count, baseImage? }`
