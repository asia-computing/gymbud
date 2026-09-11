# GYMBUD · teaser website

Static single-page teaser with an email capture form. React + Vite + Chakra UI,
deployed to GitHub Pages by `.github/workflows/static.yml`.

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # serve the built output
```

## Theme

The site is **dark only**, themed `data-theme="dark"` on `<html>` in
`index.html`. That attribute and those values are the app's own shipped dark
theme, copied from the app's `src/index.css` into `styles/tokens.css` — the
teaser should look like the product, not like a lighter marketing skin of it.

## Design system

`styles/` is the GYMBUD CSS package and the **single source of truth** for every
colour, radius, spacing, size and duration. `src/theme/system.js` builds the
Chakra system by pointing each Chakra token at the matching `--gb-*` custom
property — no hex value or pixel size is restated in JS. A change in
`styles/tokens.css`, or a `data-theme` swap on `<html>`, retheme the whole app
with no code change.

Buttons and inputs are Chakra **recipes** ported from `.gb-btn` / `.gb-input`,
so call sites stay declarative (`<Button variant="accent">`) rather than
carrying one-off style props.

## Copy

Wording on this page is copy **of record**, not marketing writing — it is taken
verbatim from `PRODUCT.md` in the app repo:

- Headline "Your training Bud" and subtitle "You train. We hold you
  accountable" are the app's welcome-screen copy of record.
- "Hit your weekly target and meet people who show up with you." is the second
  half of the PWA manifest description, the marketing line of record.
- The product speaks as **"we"** in exactly three places, all in the app. The
  welcome subtitle above is one of them; the signup confirmation deliberately
  stays second person rather than adding a fourth.

Read Brand Commitments in `PRODUCT.md` before rewording any of it.

## Signups

Submitted emails are appended to a Google Sheet by an Apps Script Web App.

1. Deploy `scripts/gymbud-signups.gs` — setup steps are in the file header.
2. Local: copy `.env.example` to `.env` and set `VITE_SIGNUP_ENDPOINT` to the
   script's `/exec` URL.
3. Production: set the same name as an Actions **variable**
   (Settings ▸ Secrets and variables ▸ Actions ▸ Variables). The Pages workflow
   passes it into the build.

`src/services/signup.js` is the only module that knows where emails go —
swapping the Sheet for Supabase later touches that file and nothing else.
