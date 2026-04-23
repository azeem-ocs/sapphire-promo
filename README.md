# Sapphire Studios — 20s Promo (Hyperframes + Claude Code)

A 20-second, 9:16 vertical promotional video for **Sapphire Studios** — a performance creative agency (UGC, PGC, AIGC, CGI, animations, and data-backed high-converting ads). Built entirely in HTML/CSS + GSAP and rendered to MP4 through [HeyGen Hyperframes](https://github.com/heygen-com/hyperframes).

**Final output:** [`video.mp4`](./video.mp4) — 1080×1920, 30fps, H.264 + AAC, exactly 20.000s.

> For the full build log — brand system, per-act motion breakdown, technical gotchas, audio synthesis details, and verification — see [BUILD-NOTES.md](./BUILD-NOTES.md).

---

## Creative Approach — One Sentence

A five-act problem→solution story (Hook → Tension → Reveal → Authority → CTA) that opens with a bold accusation ("YOUR ADS ARE LEAKING MONEY."), exposes the diagnostic failures in a shaking 3×3 grid, resolves with the Sapphire Studios wordmark + service stack, validates with client logos and live count-up stats (320+ campaigns, 4.8× ROAS), and closes on a tight `sapphirestudios.co` CTA — delivered as a single deterministic GSAP timeline with a punchy 120-BPM synthesized score and 9 synchronized SFX cues, demonstrating the ability to translate a creative brief into a fully code-driven, agent-ready video template without ever touching a timeline editor.

---

## How to Reproduce

```bash
# Requires: Node.js >= 22, FFmpeg
cd sapphire-promo
npx hyperframes preview                                       # live preview
npx hyperframes lint                                          # validate (0 errors expected)
npx hyperframes render --quality high --fps 30 -o video.mp4   # final render
```

---

## Exact Prompts Given to Claude Code

The following are the verbatim prompts given to Claude Code across the build. Each prompt is followed by a short summary of what the agent produced.

### Prompt 1 — Research & planning (Sonnet 4.6, plan mode)

> Hey claude, so i have been assigned with a job and a test task, here is the job description and the test task shared.
>
> **Job description:**
> AI Video Engineer (Claude Code & Hyperframes Specialist)
>
> Summary
> We are looking for an AI Video Engineer to redefine video production at The Third. This is not a traditional editing role. You will be our primary "Editor" who doesn't use timelines, but rather builds video through code.
>
> Using Claude Code and HeyGen Hyperframes, you will develop agentic workflows to render high-fidelity video directly from HTML/TypeScript.
>
> Key Responsibilities:
> Agentic Video Creation: Act as the primary operator of Claude Code to script, iterate, and automate video production.
> Hyperframes Development: Architect video templates and components using HeyGen Hyperframes, leveraging HTML and CSS for layout and animation.
> Programmatic Editing: Write and maintain TypeScript codebases that render into professional video assets.
> Workflow Automation: Build "Agent-ready" video systems that allow AI to generate content based on dynamic data inputs.
>
> Technical Stack & Requirements:
> Claude Code Mastery: Expert at using Claude's agentic CLI to build and refactor code-based creative projects.
> Hyperframes: Deep understanding of the heygen-com/hyperframes framework for rendering video via web technologies.
> Frontend Expert: Highly proficient in TypeScript, HTML, and CSS (specifically for motion and layout).
> Logic-Driven Design: Ability to translate creative vision into scalable, programmatic templates.
>
> How to Apply:
> Please share your GitHub or a portfolio of work that demonstrates your ability to bridge the gap between code and visual storytelling.
>
> **Test Task:**
> Take-Home Test for AI Video Engineer (Claude Code & Hyperframes Specialist)
> Thank you for your interest in the role! This test is designed to be a direct proxy for the day-to-day work: using Claude Code + Hyperframes to go from a creative brief to a polished, rendered 9:16 video asset — no timelines, no Premiere, just code.
> You will build one short vertical video and submit your full Hyperframes project. This lets us evaluate your ability to:
> - Use Claude's agentic CLI with the official Hyperframes skills.
> - Architect clean HTML/TypeScript + GSAP compositions.
> - Handle timing, layering, animations, audio, and deterministic rendering.
> - Translate a creative vision into scalable, agent-ready video templates.
>
> **What You Must Build**
> Video Specs
> - Format: 9:16 vertical (1080 × 1920 px)
> - Duration: 20 seconds exactly
> - Output: One high-quality MP4 (video.mp4)
> - Goal: Create a compelling promotional video that effectively promotes Sapphire Studios (https://sapphirestudios.co/).
>
> You have full creative freedom to interpret the brand, choose the visual style, messaging, animations, music, and overall storytelling approach. The only requirement is that the final video clearly drives awareness and interest in Sapphire Studios as a performance creative agency (UGC, PGC, AIGC, CGI, animations, and data-backed high-converting ads).
>
> **Technical Requirements (must be implemented)**
> - Use the official Hyperframes (npx skills add heygen-com/hyperframes).
> - Start your project with npx hyperframes init sapphire-promo --example blank.
> - You may use any blocks from the Hyperframes catalog if they help, but the core must be built by you + Claude Code.
>
> **How to Complete & Submit**
> Use Claude Code (Claude's agentic CLI) + Hyperframes skills to build and iterate the video.
> Run npx hyperframes preview frequently to check in-browser.
> Render the final MP4.
> Create a public GitHub repo (recommended) or a ZIP containing:
> - The entire Hyperframes project folder.
> - The rendered video.mp4.
> - A README.md that includes:
>   - The exact prompts you gave Claude Code (copy-paste the conversation or key prompts).
>   - Any iterations you made.
>   - One-sentence explanation of your creative approach and why it demonstrates your skills.
>
> **Evaluation Criteria**
> - Video Quality & Polish (45%)
> - Creativity & Storytelling (30%)
> - Agentic Workflow (20%)
> - Technical Implementation & Hyperframes Mastery (5%)

**What the agent did:** Ran parallel `Explore` agents to map the (empty) project directory and research the Hyperframes framework via `llms.txt`, then a `Plan` agent to design the five-act narrative arc (Hook → Tension → Reveal → Authority → CTA), the sapphire/midnight brand system, the GSAP master-timeline structure, and the full file layout. Output captured in [sonnet-4-6-plan.md](./sonnet-4-6-plan.md).

---

### Prompt 2 — Execute the plan (switched to Opus 4.7)

> i want you to implement this plan now.

**What the agent did:** Ran `npx hyperframes init` with the blank example, generated the brand assets (`assets/brand-tokens.css`, `logo-mark.svg`, an initial cinematic `music.mp3` via layered FFmpeg sine synthesis), built each act first as its own sub-composition under `compositions/`, wired them into `index.html` via `data-composition-src`, and ran `npx hyperframes lint` + a draft render. Frame inspection exposed a visibility-gating bug — all five sub-compositions were rendering simultaneously, with the last in DOM order dominating. Agent then inlined all five acts into a single `index.html` using `<div class="scene clip">` wrappers with per-scene `data-start` / `data-duration` / `data-track-index`, collapsing all animations into a single `window.__timelines["main"]` GSAP timeline. A second issue surfaced — GSAP's `y` / `scale` tweens corrupted CSS `transform: translate(-50%, -50%)` centering on the authority panel and orb backgrounds; fix was to switch to flexbox / margin-based centering on those elements. Final render produced a 20.000s, 1080×1920, 30fps MP4 with 0 lint errors.

---

### Prompt 3 — Audio overhaul

> Hey claude, we need to improve the audio as current audio is not very interactive.
> After task also update all .md files accordingly. the music must be interesting as promotion brand video sounds.

**What the agent did:** Replaced the ambient drone with a proper promo soundtrack. Wrote [`gen_audio.py`](./gen_audio.py) (Python stdlib + FFmpeg, zero external deps) to synthesize:
- `music.mp3` — a punchy 120-BPM track with a phase-correct frequency-swept kick drum, LCG-noise 16th-note hi-hats, snare on beats 2 & 4, 55 Hz bass, an Am chord pad entering at 7s (brand reveal), authority shimmer from 12.5s, CTA sizzle from 16.5s, and a master fade-out from 17.5–20s. Processed via `highpass → compressor 4:1 → normalize`.
- `sfx-impact.mp3` (0.34s) — freq-swept thud + transient click + 1 kHz ping, used 6× for word reveals and scene entries.
- `sfx-whoosh.mp3` (0.74s) — rising-pitch noise sweep firing at 2.88s, peaking through the Act 1→2 wipe.
- `sfx-stab.mp3` (1.82s) — Am-chord orchestral stab + sub-bass boom, firing at 7.0s on the brand reveal.

All SFX wired as `<audio class="clip">` elements with precise `data-start` / `data-duration`, escalating `data-volume` (0.55 → 1.00) across the four word hits to build drama, and `data-track-index="11"` so they layer cleanly above the main music track. Re-rendered `video.mp4`, updated `README.md`, `AGENTS.md`, `CLAUDE.md`, and `prompts-seq.md` with the new audio details. `npx hyperframes lint` still returned 0 errors.

---

### Prompt 4 — Refactor the monolithic index.html

> everything is working fine, however the index.html file currently is flooded with code, can you refactor the large file into multple files? You already tried that before as also written in README but it was not working fine so you merged all file but i want you to try again and more carefully this time.

**What the agent did:** Instead of retrying the sub-composition approach (which had caused the visibility-gating bug), the agent identified that the real noise in `index.html` was the per-act CSS and GSAP JavaScript — not the structure itself. It extracted those into external files while keeping the proven `class="clip"` scene-gating HTML intact:

- **CSS split into `styles/`** — `base.css` (reset, stage, ambient orb, noise overlay) + one file per act: `act1-hook.css`, `act2-tension.css`, `act3-reveal.css`, `act4-authority.css`, `act5-cta.css`.
- **JavaScript split into `scripts/acts/`** — `ambient.js` (persistent background rotation) + one module per act: `01-hook.js` … `05-cta.js`. Each module attaches a `window.__sapphire.animateXxx(tl)` function.
- **`index.html` became a thin shell** — HTML body + `<link>` / `<script src>` tags + a 16-line inline orchestrator that creates the master timeline, calls each act's animate function in order, and registers it on `window.__timelines["main"]`. The orchestrator stays inline because the Hyperframes linter performs a static text scan of `index.html` for the `window.__timelines` registration.

Result: `index.html` shrank from **1187 → 275 lines**. A draft render was frame-sampled across all five acts (`ffmpeg -ss <t> -vframes 1`) and visually confirmed to match the baseline `video.mp4`. `npx hyperframes lint` passed with 0 errors.

---

### Prompt 5 — Update documentation

> Now update prompts-seq.md and README.md and include this iteration as well in the docs.

**What the agent did:** Updated [prompts-seq.md](./prompts-seq.md) to add the audio-overhaul and code-refactor steps to the workflow summary, and expanded `README.md` with new rounds covering both iterations — the audio synthesis pipeline and the thin-shell refactor — plus an updated project-structure tree reflecting the new `styles/` and `scripts/acts/` directories.

---

## Iterations Summary

| # | Iteration | Trigger | Outcome |
|---|-----------|---------|---------|
| 1 | Sub-compositions → single-file | First draft render showed Act 5 CTA bleeding into Act 1 — `data-composition-src` hosts weren't gating visibility; last in DOM order won. | Inlined all 5 acts into `index.html` using `class="clip"` scene wrappers; scene gating worked first render. |
| 2 | CSS centering fix | Act 4 authority panel (and ambient/radial backgrounds) rendered off-center — GSAP `y`/`scale` tweens overwrote the CSS `transform: translate(-50%, -50%)` matrix. | Switched 4 elements to flexbox or margin-based centering; GSAP tweens applied cleanly. |
| 3 | Lint cleanup | `npx hyperframes lint` flagged 6 errors on the first pass (`host_missing_composition_id` ×5, `media_missing_id` ×1) plus an overlapping-tween warning on `#ambient-orb`. | Added missing IDs and removed the redundant breathing scale; 0 errors. |
| 4 | Audio overhaul (Prompt 3) | Initial ambient drone didn't feel promotional. | Wrote `gen_audio.py`; generated a 120-BPM score + 3 SFX assets; added 9 synchronized SFX cues with escalating volumes. |
| 5 | Thin-shell refactor (Prompt 4) | Monolithic 1187-line `index.html` was hard to scan after the audio pass. | Extracted CSS → `styles/` (6 files) and GSAP → `scripts/acts/` (6 modules); `index.html` shrank to 275 lines while preserving scene-gating behaviour. |

**Verification method throughout:** draft renders (`npx hyperframes render --quality draft`) followed by per-scene frame extraction (`ffmpeg -ss <t> -vframes 1 frame.png`) at act boundaries and visual inspection — much faster than watching the full video between iterations.

---

## Verification

```
$ ffprobe video.mp4
Duration: 20.000000s
Video:    h264, 1080×1920, 30fps
Audio:    aac, 48kHz stereo
```

- [x] 20.0s exactly
- [x] 1080×1920 (9:16)
- [x] 30fps
- [x] Audio synced; master fade-out 17.5–20s
- [x] 9 synchronized SFX cues (4 word impacts, whoosh, flash, stab, 2 scene entries)
- [x] All 5 acts visible at correct timings
- [x] `npx hyperframes lint` → 0 errors

---

Built with Claude Code + Hyperframes · no timeline editor was used at any point.
