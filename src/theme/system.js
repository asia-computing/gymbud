import { createSystem, defaultConfig, defineConfig, defineRecipe } from "@chakra-ui/react"

/**
 * GYMBUD · Chakra system
 *
 * The design system lives in `styles/` as plain CSS custom properties and is
 * the single source of truth — this file does NOT restate any hex value or
 * pixel size. Every token below points at a `--gb-*` variable, so a change in
 * `styles/tokens.css` (or a `[data-theme]` swap) flows straight through Chakra.
 */

const gb = (name) => ({ value: `var(--gb-${name})` })

const tokens = {
  colors: {
    gb: {
      bg: gb("bg"),
      paper: gb("paper"),
      paper2: gb("paper-2"),
      ink: gb("ink"),
      ink2: gb("ink-2"),
      muted: gb("muted"),
      hair: gb("hair"),
      hairStrong: gb("hair-strong"),
      // Empty progress/streak segments. Heavier than a hairline: an unearned
      // segment must still read as a segment.
      track: gb("track"),
      // Accent contract: lime = "you", coral = "your bud". Never repurpose.
      accent: gb("accent"),
      accentInk: gb("accent-ink"),
      accentSoft: gb("accent-soft"),
      accent2: gb("accent-2"),
      accent2Ink: gb("accent-2-ink"),
      // Coral as *text*. Coral itself is a fill only — it fails AA at small
      // sizes. Same meaning, different contrast.
      accent2Text: gb("accent-2-text"),
      accent2Soft: gb("accent-2-soft"),
      onInk: gb("on-ink"),
      success: gb("success"),
      danger: gb("danger"),
    },
  },
  fonts: {
    display: gb("font-display"),
    body: gb("font-body"),
    mono: gb("font-mono"),
  },
  radii: {
    gbXs: gb("r-xs"),
    gbSm: gb("r-sm"),
    gbMd: gb("r-md"),
    gbLg: gb("r-lg"),
    gbXl: gb("r-xl"),
    gbPill: gb("r-pill"),
  },
  spacing: {
    gb1: gb("s-1"),
    gb2: gb("s-2"),
    gb3: gb("s-3"),
    gb4: gb("s-4"),
    gb5: gb("s-5"),
    gb6: gb("s-6"),
    gb8: gb("s-8"),
    gb10: gb("s-10"),
    gb12: gb("s-12"),
    gb16: gb("s-16"),
    gb20: gb("s-20"),
    gb24: gb("s-24"),
    gb32: gb("s-32"),
  },
  sizes: {
    gbHit: gb("hit"),
    gbInput: gb("h-input"),
    gbBtnLg: gb("h-btn-lg"),
    gbBtnMd: gb("h-btn-md"),
    gbBtnSm: gb("h-btn-sm"),
  },
  fontSizes: {
    gbBodyLg: gb("fs-body-lg"),
    gbBody: gb("fs-body"),
    gbBodySm: gb("fs-body-sm"),
    gbLabel: gb("fs-label"),
    gbLabelXl: gb("fs-label-xl"),
    gbDisplaySm: gb("fs-display-sm"),
    gbDisplayMd: gb("fs-display-md"),
    gbDisplayLg: gb("fs-display-lg"),
    gbDisplayXl: gb("fs-display-xl"),
    gbDisplayXxl: gb("fs-display-xxl"),
    // Web-only. The DS ships a fixed 84px hero for the phone; a page that
    // spans a desktop viewport needs the headline to scale with it. Capped at
    // 96px — past that the three lines stop reading as one block.
    gbHero: { value: "clamp(4rem, 13vw, 6rem)" },
    gbDisplayAccentXxl: gb("fs-display-accent-xxl"),
  },
  durations: {
    gb1: gb("dur-1"),
    gb2: gb("dur-2"),
    gb3: gb("dur-3"),
  },
  easings: {
    gb: gb("ease"),
    gbOut: gb("ease-out"),
  },
  shadows: {
    gb1: gb("shadow-1"),
    gb2: gb("shadow-2"),
    gb3: gb("shadow-3"),
    gbRing: gb("ring"),
  },
}

/** Chakra's own generic names, remapped onto the GYMBUD palette. */
const semanticTokens = {
  colors: {
    bg: { DEFAULT: { value: "{colors.gb.bg}" }, panel: { value: "{colors.gb.paper}" } },
    fg: { DEFAULT: { value: "{colors.gb.ink}" }, muted: { value: "{colors.gb.muted}" } },
    border: { DEFAULT: { value: "{colors.gb.hair}" } },
  },
}

/* ── Recipes ───────────────────────────────────────────────────────────────
   Ports of `.gb-btn` / `.gb-input` so call sites stay declarative:
   <Button variant="accent"> rather than a pile of one-off style props.     */

const buttonRecipe = defineRecipe({
  base: {
    fontFamily: "body",
    fontWeight: "600",
    letterSpacing: "-0.01em",
    borderRadius: "gbPill",
    whiteSpace: "nowrap",
    userSelect: "none",
    transitionProperty: "transform, background-color, box-shadow",
    transitionDuration: "gb2",
    transitionTimingFunction: "gb",
    _active: { transform: "scale(0.98)" },
    _disabled: { opacity: 0.4, pointerEvents: "none" },
    _focusVisible: { outline: "none", boxShadow: "gbRing" },
  },
  variants: {
    variant: {
      // The app's primary action is lime, not ink — see `Btn` in the app's
      // `src/components/ui.jsx`. `ink` stays available as `invert`.
      primary: { bg: "gb.accent", color: "gb.accentInk" },
      invert: { bg: "gb.ink", color: "gb.onInk" },
      accent: { bg: "gb.accent", color: "gb.accentInk" },
      accent2: { bg: "gb.accent2", color: "gb.accent2Ink" },
      ghost: { bg: "transparent", color: "gb.ink", boxShadow: "inset 0 0 0 1.5px var(--gb-ink)" },
      paper: { bg: "gb.paper", color: "gb.ink", boxShadow: "inset 0 0 0 1px var(--gb-hair)" },
    },
    size: {
      lg: { h: "gbBtnLg", px: "22px", fontSize: "17px" },
      md: { h: "gbBtnMd", px: "18px", fontSize: "15px" },
      sm: { h: "gbBtnSm", px: "14px", fontSize: "14px" },
    },
  },
  defaultVariants: { variant: "primary", size: "lg" },
})

const inputRecipe = defineRecipe({
  base: {
    h: "gbInput",
    px: "18px",
    borderRadius: "gbMd",
    bg: "gb.paper",
    color: "gb.ink",
    border: "0",
    outline: "0",
    fontFamily: "body",
    fontSize: "16px", // 16px minimum — anything smaller zooms on iOS focus
    boxShadow: "inset 0 0 0 1px var(--gb-hair)",
    transitionProperty: "box-shadow",
    transitionDuration: "gb2",
    transitionTimingFunction: "gb",
    _placeholder: { color: "gb.muted" },
    _focusVisible: { boxShadow: "inset 0 0 0 2px var(--gb-ink)" },
    "&[aria-invalid='true']": { boxShadow: "inset 0 0 0 2px var(--gb-danger)" },
  },
  variants: { variant: { gb: {} }, size: { gb: {} } },
  defaultVariants: { variant: "gb", size: "gb" },
})

/** `.gb-label` — the uppercase mono micro-label. */
const labelRecipe = defineRecipe({
  className: "gb-label-text",
  base: {
    fontFamily: "mono",
    fontWeight: "500",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "gb.muted",
    fontSize: "gbLabel",
  },
  variants: { size: { sm: { fontSize: "gbLabel" }, xl: { fontSize: "gbLabelXl" } } },
  defaultVariants: { size: "sm" },
})

const config = defineConfig({
  cssVarsPrefix: "gbc",
  globalCss: {
    "html, body": { bg: "gb.bg", color: "gb.ink", fontFamily: "body", margin: 0 },
    html: { scrollBehavior: "smooth" },
    "@media (prefers-reduced-motion: reduce)": { html: { scrollBehavior: "auto" } },
    "[id]": { scrollMarginTop: "gb16" },

    /* Browser surfaces we did not draw but still ship: selection, caret and
       scrollbar all default to chrome that belongs to no design system. */
    "*::selection": { bg: "gb.accent", color: "gb.accentInk" },
    "input, textarea": { caretColor: "gb.accent" },
    "*": { scrollbarColor: "var(--gb-hair-strong) transparent", scrollbarWidth: "thin" },
    "::-webkit-scrollbar": { width: "10px", height: "10px" },
    "::-webkit-scrollbar-thumb": {
      bg: "gb.hairStrong",
      borderRadius: "gbPill",
      border: "3px solid transparent",
      backgroundClip: "content-box",
    },

    /* The page's single authored moment: each headline line wipes up from its
       own baseline, once, on load. Declared only under no-preference, so the
       resting state is the visible one and reduced-motion gets no animation
       rather than a hidden headline. */
    "@media (prefers-reduced-motion: no-preference)": {
      ".gb-rise": {
        animation: "gb-rise 900ms cubic-bezier(0.16, 1, 0.3, 1) backwards",
      },
    },
    "@keyframes gb-rise": {
      from: { opacity: 0, transform: "translateY(0.18em)", clipPath: "inset(105% 0 -10% 0)" },
      to: { opacity: 1, transform: "translateY(0)", clipPath: "inset(-25% 0 -10% 0)" },
    },
  },
  theme: {
    tokens,
    semanticTokens,
    recipes: { button: buttonRecipe, input: inputRecipe, gbLabel: labelRecipe },
  },
})

export const system = createSystem(defaultConfig, config)
