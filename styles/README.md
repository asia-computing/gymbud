# GYMBUD Design System

A drop-in CSS package for the GYMBUD mobile app. Zero build step, zero JS, zero dependencies — just pull in one stylesheet.

## Files

| File | Purpose |
|---|---|
| `gymbud.css` | One-line import — pulls everything below. |
| `tokens.css` | Color, radius, spacing, sizing, shadow, motion variables. Includes 3 alternate themes. |
| `typography.css` | Google Fonts import + type scale + `.gb-display-*`, `.gb-body-*`, `.gb-label` utilities. |
| `components.css` | Buttons, chips, inputs, OTP, tabs, cards, badges, avatars, activity tiles, bottom nav, map markers. |
| `tokens.json` | W3C-format design tokens for Style Dictionary, Tokens Studio, etc. |
| `preview.html` | Visual reference. Open it to see every component rendered. |

## Install

Copy the `gymbud-ds/` folder anywhere in your project, then in your global stylesheet:

```css
@import "gymbud-ds/gymbud.css";
```

Or pull pieces individually:

```css
@import "gymbud-ds/tokens.css";
@import "gymbud-ds/typography.css";
@import "gymbud-ds/components.css";
```

If you don't have a CSS bundler, drop them in `<head>` directly:

```html
<link rel="stylesheet" href="/gymbud-ds/gymbud.css">
```

## Themes

Default theme is **Steel & Lime** (warm cream + lime + coral). Three alternates ship in the same file — swap by toggling an attribute on the document root:

```html
<html data-theme="dusk-coral">    <!-- warm coral primary -->
<html data-theme="midnight-neon"> <!-- dark mode, electric lime -->
<html data-theme="court-cobalt">  <!-- cobalt primary, mustard accent -->
```

Themes only override semantic color tokens — everything else (typography, spacing, radii, motion) stays put.

## Token naming

All variables are prefixed `--gb-` to avoid collisions. Three layers:

```
--gb-bg, --gb-paper, --gb-ink, --gb-muted        ← semantic surface/text
--gb-accent, --gb-accent-2                       ← brand accents ("you" / "bud")
--gb-tint-weight, --gb-tint-run, …               ← per-activity tints
--gb-r-md, --gb-s-4, --gb-shadow-2, --gb-dur-2   ← scalar tokens
```

The two accents are **semantic, not arbitrary**: lime always means "you" and coral always means "your bud". Keep this contract or the You/Your-bud tabs lose their meaning.

## Components — quick reference

### Buttons

```html
<button class="gb-btn gb-btn--primary gb-btn--full">Continue</button>
<button class="gb-btn gb-btn--accent">Bud up</button>
<button class="gb-btn gb-btn--ghost">Skip</button>
<button class="gb-btn gb-btn--paper">Continue with Google</button>

<button class="gb-icon-btn" aria-label="Back"><svg>…</svg></button>
```

Sizes: add `gb-btn--md` or `gb-btn--sm`. Full-width: add `gb-btn--full`.

### Inputs

```html
<label class="gb-field-label">Email</label>
<div class="gb-input">
  <input type="email" placeholder="email@domain.com">
</div>

<!-- OTP / verification code -->
<div class="gb-otp">
  <div class="gb-otp__cell">1</div>
  <div class="gb-otp__cell gb-otp__cell--active"></div>
  <div class="gb-otp__cell"></div>
  …
</div>
```

### Chips (toggleable)

```html
<button class="gb-chip" aria-pressed="false">Build strength</button>
<button class="gb-chip" aria-pressed="true">Stay consistent</button>
```

### Segmented tabs (You / Your bud)

```html
<div class="gb-tabs gb-tabs--accent2" role="tablist">
  <button class="gb-tab" aria-selected="true">You</button>
  <button class="gb-tab" aria-selected="false">Your bud</button>
</div>
```

`.gb-tabs--accent2` turns the second tab coral when selected — the visual cue for "your bud".

### Cards

```html
<div class="gb-card">              <!-- paper -->
<div class="gb-card gb-card--ink"> <!-- dark hero -->
<div class="gb-card gb-card--accent"> <!-- lime CTA card -->
```

### Activity tile

```html
<button class="gb-tile gb-tile--cali" aria-pressed="true">
  <span class="gb-tile__index">02</span>
  <span class="gb-tile__title">Calisthenics</span>
</button>
```

### Bottom nav

```html
<nav class="gb-bottomnav">
  <button class="gb-bottomnav__item" aria-current="page">Discover</button>
  <button class="gb-bottomnav__item">Buddies</button>
  …
</nav>
```

## Style rules (the short list)

1. **Lime = you, coral = your bud.** Never repurpose.
2. **Pills (999 r) for actions; 20 r for cards.** Don't invent intermediate radii.
3. **Numerals are mono.** Match percent, distance, sets, reps, timers.
4. **Uppercase mono micro-label** (`gb-label`) above section heads — never above buttons.
5. **No emoji.** Use color tiles + shape for affect.
6. **Hairline borders, not shadows**, for resting state. Reserve shadow-3 for floating chrome (bottom nav).
7. **Display font in 700–800** with `-0.025em` tracking. Body never goes below 13 px.
8. **44 px** is the minimum tap target. Buttons are 46/56.

## Tooling

If you use Style Dictionary or Tokens Studio:

```bash
# Style Dictionary
style-dictionary build --tokens gymbud-ds/tokens.json
```

The JSON is W3C-style ($value / $type) so most tools accept it as-is.

## Fonts

Default uses Google Fonts hosted CDN via `@import` in `typography.css`. For production:

1. Self-host the WOFF2 files (Bricolage Grotesque variable, Inter 400–800, JetBrains Mono 400–500).
2. Replace the `@import` block with your own `@font-face` declarations.
3. Add `font-display: swap` to avoid FOIT.

## React / Tailwind

This package is plain CSS by design — it works with anything. For Tailwind, pass the tokens through `theme.extend`:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        ink:    "var(--gb-ink)",
        paper:  "var(--gb-paper)",
        accent: "var(--gb-accent)",
        accent2:"var(--gb-accent-2)",
      },
      borderRadius: { pill: "999px" },
      fontFamily: {
        display: ["Bricolage Grotesque", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
};
```

For styled-components / Emotion, read tokens from `getComputedStyle(document.documentElement)` or import `tokens.json` directly.
