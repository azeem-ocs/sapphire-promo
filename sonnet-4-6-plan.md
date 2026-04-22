# Sapphire Studios — 20s Promo Video (Hyperframes)

## Context
Test task for an AI Video Engineer role. Build a 20-second, 9:16 (1080×1920px) promotional MP4 for Sapphire Studios (https://sapphirestudios.co/) — a performance creative agency — using HeyGen Hyperframes + GSAP. No timeline editor; everything is HTML/CSS/GSAP rendered to MP4 via headless Chrome + FFmpeg.

Working directory: `/Users/macbookpro/Desktop/azeem-projects/ai_video_generation` (empty).

---

## Final File Structure

```
ai_video_generation/
└── sapphire-promo/           ← npx hyperframes init output
    ├── index.html            ← Root composition (stitches all acts)
    ├── hyperframes.json      ← fps:30, 1080×1920, duration:20
    ├── assets/
    │   ├── brand-tokens.css  ← CSS vars + Google Fonts CDN
    │   ├── music.mp3         ← Royalty-free, trimmed to 20s
    │   └── logo-mark.svg     ← Geometric diamond (2 triangles)
    └── compositions/
        ├── 01-hook.html      ← 0–3.5s
        ├── 02-tension.html   ← 3.5–7.0s
        ├── 03-reveal.html    ← 7.0–12.5s
        ├── 04-authority.html ← 12.5–16.5s
        └── 05-cta.html       ← 16.5–20.0s
```

---

## Creative Narrative (20s Arc)

| Act | Time | Scene | Key Motion |
|-----|------|-------|------------|
| 1 | 0–3.5s | **Hook** — "YOUR ADS ARE LEAKING MONEY." | Words drop/slam in, SplitText char stagger, sapphire radial pulse, clip-path wipe exit |
| 2 | 3.5–7s | **Tension** — 3×3 grid of bad-creative metrics (0.4% CTR, 0.8× ROAS, "MISSING HOOK"…) | Panels slam in staggered, grid shakes, red SVG X draws across, flash-white cut |
| 3 | 7–12.5s | **Reveal** — SAPPHIRE STUDIOS + 4 service pills | 3D rotateY word flip, SVG divider draws, pills clip-path reveal, tagline word stagger |
| 4 | 12.5–16.5s | **Authority** — glass panel, client name ticker, 320+ / 4.8× stats | Panel slides up, CSS marquee, GSAP countup (TextPlugin), sapphire gradient sweep exit |
| 5 | 16.5–20s | **CTA** — logo + wordmark + sapphirestudios.co | SVG stroke draw, char stagger, conic-gradient rotating border on CTA pill, glow pulse |

---

## Brand Design System

**Colors (CSS vars in brand-tokens.css):**
- `--sapphire-core: #1A5CFF` — primary
- `--sapphire-bright: #3D7BFF` — highlights
- `--midnight: #050B18` — background
- `--white-pure: #FFFFFF`, `--white-muted: #C8D0E0`
- `--danger-red: #FF3B3B` — tension act only

**Fonts (Google CDN):** Syne 700/800 for display, Inter 400–700 for body

**Type scale:** 160px hook, 88px headline, 48px service pills, 32px tagline/CTA

---

## Hyperframes Patterns (Must Follow)

```html
<!-- Root stage -->
<div id="stage" data-composition-id="sapphire-main"
     data-width="1080" data-height="1920">

  <!-- Sub-composition slot -->
  <div class="clip"
       data-composition-src="./compositions/01-hook.html"
       data-start="0" data-duration="3.5" data-track-index="1">
  </div>

  <!-- Audio -->
  <audio class="clip" data-start="0" data-duration="20"
         data-volume="0.55" src="./assets/music.mp3"></audio>
</div>

<!-- GSAP timelines must be paused and registered -->
<script>
  const tl = gsap.timeline({ paused: true });
  window.__timelines = window.__timelines || {};
  window.__timelines["sapphire-main"] = tl;
</script>
```

Each sub-composition has its own `data-composition-id` that **exactly matches** its `window.__timelines[key]`.

---

## Key GSAP Techniques Per Act

**Act 1 (hook):** `SplitText` char stagger (`y: -160→0`, `x: +220→0`), `filter: blur(12px) hue-rotate(180deg)` flash, `clipPath: "inset(0 0 100% 0)"` wipe exit

**Act 2 (tension):** Panel stagger from random, `x` oscillation shake (amplitude 4px × 7 repeats), SVG `stroke-dashoffset` X draw, flash-white `opacity 0→1→0`

**Act 3 (reveal):** `rotateY: -90→0` 3D flip, `width: 0→920px` divider, `clipPath: inset(100% 0 0 0)→inset(0)` pill reveals, `elastic.out(1,0.5)` confidence pulse

**Act 4 (authority):** `y: 200→0` glass panel, CSS `@keyframes` ticker (no GSAP), `onUpdate` countup for "320+", `TextPlugin` for "4.8×"

**Act 5 (CTA):** SVG `stroke-dashoffset` triangle draw, `SplitText` char stagger, GSAP tween of `--cta-angle` CSS custom property for rotating conic border, `box-shadow` radial glow pulse

---

## Implementation Steps

### Step 1 — Init project
```bash
cd /Users/macbookpro/Desktop/azeem-projects/ai_video_generation
npx hyperframes init sapphire-promo --example blank
cd sapphire-promo
```

### Step 2 — Prepare assets
- Download royalty-free audio (Mixkit or Bensound cinematic)
- Trim to 20s with fade-out: `ffmpeg -i source.mp3 -t 20 -af "afade=t=out:st=18:d=2" assets/music.mp3`
- Create `assets/brand-tokens.css` with all CSS vars + Google Fonts CDN import
- Create `assets/logo-mark.svg` (two-triangle diamond geometry)

### Step 3 — Build compositions (in order)
Write each HTML file with inline GSAP timeline + `window.__timelines[id]` registration:
`01-hook.html` → `02-tension.html` → `03-reveal.html` → `04-authority.html` → `05-cta.html`

### Step 4 — Wire root `index.html`
- `data-composition-src` slots for all 5 acts with correct `data-start` / `data-duration`
- Ambient background orb (conic-gradient, GSAP tweens `--orb-angle` 0→360deg over 20s)
- Audio element with `data-volume="0.55"`

### Step 5 — Preview & iterate
```bash
npx hyperframes preview
```
Check timing, readability, animation smoothness per act. Iterate compositions individually.

### Step 6 — Lint
```bash
npx hyperframes lint
```
Fix any overlapping track-index or missing attribute warnings.

### Step 7 — Render
```bash
npx hyperframes render --output video.mp4
```

### Step 8 — Write README.md
Document the full Claude Code prompt chain (10 prompts), creative rationale, and project structure.

---

## README Prompt Chain (Agentic Workflow Evidence)

10 documented prompts covering: init → brand tokens → each act (5 prompts) → root wiring → preview refinement → final render. Each prompt is copy-pasteable and maps to a specific file change — demonstrating true agentic iteration.

---

## Verification

- Open `video.mp4` and confirm: 20.0s duration, 1080×1920px, 30fps, no black frames, no jank
- Scrub to each act boundary (3.5s, 7.0s, 12.5s, 16.5s) and confirm clean transitions
- Confirm audio plays through and fades out at ~18s
- Confirm final frame holds on CTA lockup through 20.0s
- `npx hyperframes lint` returns zero errors
