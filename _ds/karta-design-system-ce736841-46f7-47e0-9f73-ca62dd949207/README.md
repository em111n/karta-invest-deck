# Karta — Design System

A design system for **Karta**, built to produce on-brand pitch decks, interactive proposals,
and product/marketing surfaces. The **visual language is adapted from the Pitch Pro proposal
template** (`https://thepitchpro.framer.website/`) — a dark, editorial, long-scroll document —
and re-skinned in Karta's identity: the **acid `#CCFF00`** accent and the Karta wordmark + symbol.

> "A brand, a product, and a website — built to work together."

**The aesthetic:** brutalist-editorial × premium dark. A near-black canvas (`#030303`), a single
electric **acid/chartreuse** accent (`#CCFF00`), hairline-bordered charcoal cards, and tight
medium-weight grotesque type (**Archivo**). Structure is numbered and spec-sheet-like
(`[ commercial proposal ]`, `[ 02 ]`), with a sticky mega-menu and full-bleed hero.

## Sources
- **Brand assets (provided by Karta):** `uploads/Karta-Logo-Acid.svg`, `uploads/Karta-Symbol-Filled-Acid.svg` → vectorized into `assets/` (acid, white, mono, and currentColor variants).
- **Visual-language reference (template):** saved Framer site at `PD/Pitch Pro - The proposal that closes the deal..html` (+ `_files/`), mounted read-only. Live: `https://thepitchpro.framer.website/` (by the studio Madrepunk™). Karta adopts its *layout & type system*, not its brand.
- No Karta Figma or codebase was provided; foundations below are derived from the template HTML/CSS + Karta's logos.

---

## Content Fundamentals

**Voice — confident, consultative, plainspoken.** Copy talks *to* the client in second person
("**You've** built something real"), positioning Karta as the calm expert who arrives
mid-momentum. Reassuring, not salesy; it names the client's situation before proposing a fix.

- **Person:** "**you / your**" for the client, "**we / our**" for Karta. Recurring first-person-plural framing labels: *"our read"*, *"our work"*, *"what we're building together"*.
- **Casing:** **Sentence case** for prose. Section *titles* are Title Case ("Who We Are", "Next Steps"). Tiny meta-labels are **lowercase** inside brackets: `[ commercial proposal ]`, `[ our read ]`, `[ 02 ]`.
- **Punctuation:** the **em dash —** is a signature device for the second beat of a sentence. Lists use the bullet **•** ("Branding • UX/UI • Website").
- **Brackets as a system:** running labels are always `[ … ]` with brackets dimmed, the word brighter — a structural "spec-sheet" feel.
- **Rhythm:** short declarative sentences; one bold lead statement per section, then a calm supporting paragraph. Numbers stay understated.
- **Tone words:** real, clarity, credibility, method, predictability, intentional, cohesive.
- **No emoji.** No exclamation hype. Trademark "™" only where a brand requires it.

*Examples*
- Hero: "Karta — A brand, a product, and a website — built to work together."
- Lead: "This proposal brings together everything your brand needs to communicate with the clarity and credibility it deserves — from the first visual touchpoint to the last page of your digital presence."
- Card: "Our read on where you stand" → "You've built something real. The product works, the team is ready. What's lagging behind is how it looks and how it's found."

---

## Visual Foundations

**Overall vibe:** premium dark editorial. A near-black stage holds a single 1040px-wide column.
Energy comes from one acid accent and strict hairline geometry — *not* from color variety,
gradients, or ornament. The system is **flat**: depth = stepped surfaces + 1px borders, never shadows.

### Color
- One page background (`#030303`) shared by every section; rhythm comes from spacing, not bg swaps.
- One accent: **acid `#CCFF00`** — buttons, role/eyebrow text, big stat numbers, nav active dot, highlights, selection. Used sparingly, always full-saturation.
- Charcoal surface steps for elevation: `#0D0D0D` (cards) → `#141414` → `#1C1C1C` (mega-menu) → `#333` (nav pills / chips).
- Text is a 4-step light ramp on dark: `#FAFAFA` headings → `#ABABAB` body → `#919191` captions → `#5E5E5E` brackets/disabled.

### Typography
- **Archivo** — display & UI (headings, leads, card titles, buttons, labels). A geometric grotesque; dominant weight **500 (Medium)**; 600/700 for emphasis. Tight tracking (≈ −0.02em) on large sizes. **Self-hosted** (`fonts/archivo.woff2`, variable, latin subset).
- **Inter** — body copy and small print (Google Fonts CDN).
- The **hero title is set in monospaced ("code") styling** for a technical, working-document signature — reproduced via `--pp-font-mono` (also Archivo).
- Scale (root 16px): hero `clamp(64–128px)`, H1 `clamp(48–80px)`, lead `clamp(28–40px)`, stat 56px, card title 24px, body/label 16px, caption 14px.

### Layout
- Centered **1040px** max-width column. Section padding **80px**, inter-block gap **80px**.
- Cards: `display:flex; column; space-between` — label sits top, content bottom. 2- & 3-col grids, 20px gap. Hero & section intros are full-height.
- Sticky **mega-menu** pinned ~40px from the top; rounded charcoal bar with section pills.

### Shape, border, elevation
- **Radii:** 4px on cards/panels/images, **2px** on buttons & nav pills, 100px for circular avatars/social tiles.
- **Borders:** 1px solid `#111` hairline on nearly every card — the defining structural motif.
- **Shadows:** none. Elevation = surface step + hairline.

### Imagery
- Full-color, warm/neutral editorial photography; project covers on the studio's signature acid-green 3D-striped set.
- Cover images sit in 4px-radius cards with a **bottom "protection" gradient** (`linear-gradient(180deg, transparent, #030303)`) so the `[ label ]` + title read cleanly. `object-fit: cover`. No grain, no duotone, no filters.

### Motion
- Smooth, restrained. Entrances are **fade + 20–50px rise**; hero/section titles do a **per-character stagger up**. Easing ≈ `cubic-bezier(0.44,0,0.16,1)`, ~0.4s. Smooth scroll.
- **Hover:** acid button brightens; charcoal controls lighten; project cards show an acid "See live website ↗" cursor + slight image zoom. **Press:** subtle scale-down (~0.98).
- No bounces, no parallax gimmicks, no glassmorphism.

---

## Iconography

- **No icon font / no large set.** Icons are a handful of **inline SVGs**, 18×18 viewBox, drawn in the **acid accent** or as a thin geometric stroke — e.g. nav bullet/active dot, small arrows, mail glyph.
- Social links are small **rounded-square (4px) charcoal tiles** with a white glyph.
- **No emoji.** The only "icon-as-type" devices are the bracket pair `[ ]` and the bullet `•`.
- **Brand marks** (in `assets/`): Karta **wordmark** (`karta-logo-acid.svg`, `karta-logo-white.svg`, `karta-logo.svg` = currentColor) and **symbol** (`karta-symbol-acid.svg` = mark on acid square, `karta-symbol-mark-acid.svg` = acid mark transparent bg, `karta-symbol.svg` = currentColor mark).
- ⚠️ External SVGs loaded via `<img src>` **don't inherit `currentColor`** — use the concrete acid/white files in `<img>`; reserve the `currentColor` versions for inline SVG.
- Need more icons? Use a thin geometric line set (**Lucide**, 1.5–2px stroke), acid on dark or white inside charcoal tiles. Avoid filled/duotone styles.

---

## Index / Manifest

| File | What it is |
|---|---|
| `README.md` | This document |
| `SKILL.md` | Agent-Skill manifest (use this system in Claude Code) |
| `colors_and_type.css` | All color/type tokens + semantic classes (`.pp-*` namespace). Import everywhere. |
| `assets/` | Karta logo & symbol variants; `photo-team.png`, `project-*.png` (template sample imagery) |
| `preview/` | Design-system cards (Colors · Type · Spacing · Components · Brand) shown in the Design System tab |
| `ui_kits/proposal/` | Interactive recreation of the proposal surface in Karta's brand (sticky nav, hero, sections) |
| `slides/` | 16:9 deck slide types (`TitleSlide`, `SectionDivider`, `ContentCards`, `BigQuote`, `Investment`) + a viewer (`index.html`) and a reusable transitions library (`transitions.js`) |

### Tokens at a glance
- Accent `#CCFF00` · Page `#030303` · Card `#0D0D0D` · Hairline `#111`
- Text `#FAFAFA / #ABABAB / #919191 / #5E5E5E`
- Type: Archivo (display/UI, wt 500, self-hosted) · Inter (body)
- Radii 2px / 4px · Section 80px · Column 1040px · Flat (no shadows)

## Caveats
- **Token namespace is `--pp-*`** (carried over from the template build). `--pp-acid` / `--pp-lime` both = `#CCFF00`.
- **Archivo is self-hosted** (`fonts/archivo.woff2`, variable latin subset); **Inter loads from Google Fonts CDN**. For fully-offline Inter too, drop its woff2 in `fonts/` and swap the `@import` in `colors_and_type.css`.
- **UI-kit & deck content is sample/placeholder** (example team, projects, pricing) to demonstrate the system — replace with Karta's real content.
- `photo-team.png` / `project-*.png` are the **template's** sample imagery, kept only as photographic-treatment references — swap for Karta's own.
