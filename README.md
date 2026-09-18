# 8x Studio

**8x Studio** is an AI-native creative platform for generating and managing visual content. It brings together image creation, model discovery, asset storage, and subscription plans in one place—designed for creators, marketers, and teams who want a fast, modern studio experience without jumping between tools.

---

## What we do

8x Studio helps you **turn ideas into images** using leading AI models, explore what’s possible across video and effects-style workflows, and **keep everything organized** in your account.

### Create

- **Image studio** — Write a prompt, pick aspect ratio and model style, and generate one or many results in a single flow.
- **Model catalog** — Browse Nano Banana, Seedance, Kling, and other studio models from a Higgsfield-inspired picker.
- **Reference uploads** — Use image inputs where the studio supports them for more controlled outputs.
- **Your own keys (optional)** — Bring your own provider credentials in settings when you want to run generations on your quota.

### Explore & discover

- **Marketing home** — Hero showcases, VFX-style sections, community highlights, and feature strips that mirror a full creative suite landing experience.
- **Templates & effects** — Jump into preset flows and example pages to start from a known look or effect.
- **Suite pages** — Dedicated areas for video, audio, cinema, enterprise, and related product story pages.

### Account & assets

- **Sign up / log in** — Firebase auth when configured, or local demo auth for development.
- **Gallery** — Save and revisit generations from your session.
- **Account profile** — See your name, email, and **Free vs Pro** plan with a clear badge in the header.
- **Pro subscription** — Upgrade via demo billing (Cashfree sandbox); Pro unlocks priority messaging, profile badge, and full create access in the product narrative.

### For builders & teams

- **API product area** — Explore the model surface and integration story (console-style UI for developers evaluating the platform).
- **Docs, help, legal** — Privacy, terms, cookies, and help center pages for a production-ready site shell.

---

## Who it’s for

| Audience | How 8x Studio helps |
|----------|---------------------|
| **Creators** | Generate images quickly, try different models, save work to the gallery. |
| **Marketers** | Use templates and landing-style pages to pitch campaigns and visual concepts. |
| **Learners & prototypers** | Run the full UI locally, test auth and billing flows, and extend the studio. |

---

## Tech stack (overview)

- **Next.js 14** — App Router, server and client components  
- **React 18** — UI and state (Zustand)  
- **Tailwind CSS** — Dark, brand-forward studio design  
- **Firebase** — Authentication and user profiles (optional)  
- **Gemini** — Image generation when keys are configured  

---

## Run locally

```powershell
cd "d:\8x assignment"
node ./scripts/dev.mjs
```

Open [http://localhost:3000](http://localhost:3000). On Windows you can also use `dev.cmd`.

Copy `.env.example` to `.env.local` and fill in the values you need for auth, generation, and billing. **Do not commit `.env.local`.**

If the UI looks unstyled, hard refresh (**Ctrl+Shift+R**). Avoid running a production build while the dev server is running.

---

## Main areas of the app

| Area | What you’ll find |
|------|------------------|
| **Home** | Explore hero, promos, and feature sections |
| **Create** | Image generation studio |
| **Gallery** | Your saved assets |
| **Pricing / Billing** | Plans and Pro checkout (demo) |
| **Account** | Profile and subscription status |
| **Login / Sign up** | Access your studio |

---

## Repository

**GitHub:** [Ayushpund/8x-assignment](https://github.com/Ayushpund/8x-assignment)

---

## License

Private assignment / portfolio project unless otherwise noted by the owner.
