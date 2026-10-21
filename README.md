# GS Property Group — homepage redesign

A responsive, premium redesign of the GS Property Group homepage, built with the
existing React + Vite + Tailwind stack.

## Run locally

```bash
npm install
npm run dev
```

Then open:

- App: `http://localhost:5173/`
- WordPress-ready static preview: `http://localhost:5173/wordpress-preview/`
- WordPress theme download: `http://localhost:5173/gs-property-group-wordpress-theme.zip`

## Build

```bash
npm run build
```

The production app is written to `dist/index.html`. The WordPress preview and
theme zip are copied into `dist/` as part of the build.

## WordPress

See [`WORDPRESS.md`](WORDPRESS.md) for install instructions, the theme source
location and the form-integration note.

## Design notes

- The full seven-link desktop navigation is shown at **1360px and above**.
  Below that, the compact header keeps the phone, CTA and an accessible
  full-screen menu.
- The header is transparent over the hero and becomes cream on scroll.
- The hero uses an editorial credibility card on wide screens and a swipeable
  audience carousel on phones.
- All audience cards, hero audience links and footer audience links pre-select
  the matching enquiry form and scroll to it.
- The enquiry form is a visual preview and needs a form plugin or backend before
  launch.
