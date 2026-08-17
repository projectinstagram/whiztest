# WhizTest.in — Production Website

A complete, production-ready Next.js website featuring:

- **3D Service Card Swipe** — Tinder-style draggable card deck with perspective depth
- **Live AI Chat** — Powered by NVIDIA Nemotron-3-Nano-30B-A3B via streaming SSE
- **Dark / Light Mode** — Persisted in localStorage, respects system preference
- **Fully Responsive** — Mobile-first, works on all screen sizes
- **8 Service Sections** — Each with detailed modal, features, tech stack, timeline
- **Portfolio, Testimonials, Pricing, FAQ, Contact** — All production-ready

---

## ⚡ Quick Start (VS Code)

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
The `.env.local` file is already included with your NVIDIA API key.
If you need to reset it:
```bash
cp .env.local.example .env.local
# then edit .env.local and add your NVIDIA_API_KEY
```

### 3. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — done!

---

## 🚀 Deploy to Vercel

### Option A — Vercel CLI (fastest)
```bash
npx vercel
# Follow the prompts, then add your env var:
npx vercel env add NVIDIA_API_KEY
```

### Option B — GitHub + Vercel Dashboard
1. Push this project to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/whiztest
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) → **New Project** → Import your repo
3. In **Environment Variables**, add:
   - **Name:** `NVIDIA_API_KEY`
   - **Value:** `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`
4. Click **Deploy** — Vercel auto-detects Next.js, zero config needed.

> ⚠️ **Important:** Never commit `.env.local` to GitHub. It's already in `.gitignore`.
> Always add the API key via Vercel's dashboard Environment Variables panel.

---

## 📁 Project Structure

```
whiztest-nextjs/
├── pages/
│   ├── index.js          # Complete website (all sections + 3D cards + AI chat)
│   ├── _document.js      # Google Fonts (Plus Jakarta Sans) + favicon
│   └── api/
│       └── chat.js       # NVIDIA Nemotron streaming API route (Edge Runtime)
├── styles/
│   └── globals.css       # Global resets + CSS keyframe animations
├── public/
│   └── favicon.svg       # WhizTest W logo favicon
├── .env.local            # API key (gitignored)
├── .env.local.example    # Template for collaborators
├── next.config.js
└── package.json
```

---

## 🤖 AI Chat — How It Works

The chat widget (`LiveChat` component in `pages/index.js`) connects to the internal
API route `pages/api/chat.js`, which runs on Vercel's **Edge Runtime** for true
streaming with zero cold-start latency.

The API route:
- Accepts `POST /api/chat` with `{ messages: [...] }`
- Prepends a detailed WhizTest system prompt
- Calls NVIDIA's OpenAI-compatible endpoint with `stream: true`
- Pipes the SSE stream directly back to the browser
- The client reads chunks, accumulates deltas, updates the last message in-place

**Model:** `nvidia/nemotron-3-nano-30b-a3b`
**Base URL:** `https://integrate.api.nvidia.com/v1`

---

## 🃏 3D Card Swipe — How It Works

The `ServiceCards3D` component in `pages/index.js`:

1. **Stack of 3 cards** — back, mid, and top — all `position: absolute` in a
   `perspective: 1200px` container
2. **Top card** is interactive via the **Pointer Events API** (`onPointerDown/Move/Up`)
   with `setPointerCapture` for reliable drag tracking on both mouse and touch
3. **Drag feedback** — card rotates proportionally to drag distance; mid/back cards
   scale up slightly as the top card moves away
4. **Swipe threshold** — releasing at > 85px triggers a full swipe; less snaps back
5. **Animation sequence:**
   - Top card flies off screen (`translateX(±820px)`) in 310ms
   - `topIdx` updates, new card placed off-screen opposite side (no transition)
   - Double `requestAnimationFrame` → card slides in with spring easing

---

## 🎨 Customisation

### Update business info
Edit the data arrays at the top of `pages/index.js`:
- `SERVICES` — your service offerings
- `STATS` — key metrics
- `TESTIMONIALS` — client reviews
- `PRICING` — pricing packages
- `PORTFOLIO` — project showcase

### Update AI knowledge
Edit `SYSTEM_PROMPT` in `pages/api/chat.js` to reflect your actual:
- Services, pricing, timelines
- Contact details
- Company story

### Change contact details
Search for `99999 99999` and `hello@whiztest.in` in `pages/index.js` and replace.

---

## 🛠 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server at localhost:3000 |
| `npm run build` | Create production build |
| `npm run start` | Start production server (after build) |
| `npm run lint` | Run ESLint |

---

Built with Next.js 14 · React 18 · NVIDIA Nemotron · Vercel Edge Runtime
