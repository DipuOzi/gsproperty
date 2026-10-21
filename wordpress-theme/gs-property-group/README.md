# GS Property Group — WordPress theme

This folder contains a static WordPress theme that mirrors the approved React
homepage design one-to-one.

## Install

1. Zip the `gs-property-group` folder (or use the ready-made
   `public/gs-property-group-wordpress-theme.zip`).
2. In WordPress go to **Appearance → Themes → Add New → Upload Theme**.
3. Upload the zip and activate **GS Property Group**.
4. The homepage will be available at the site root.

## What is included

- `index.php` — the complete homepage markup, including the fixed header,
  hero, audience pathways, trust content, process, enquiry form, FAQ and footer.
- `assets/site.css` — the compiled, framework-free stylesheet (Tailwind output
  plus the small set of interactive state rules).
- `assets/site.js` — vanilla JavaScript for the header, mobile menu, FAQ,
  audience selector and form field variants.
- `functions.php` — enqueues fonts, styles and scripts.

## Form integration

The enquiry form is a design preview and does not send email. Connect it to a
WordPress form plugin (Contact Form 7, WPForms, Gravity Forms, etc.) or your own
`admin-post.php` handler before launch. The markup and field variants are
already in place so the visual layout can be retained.

## Notes

- Content is intentionally hardcoded in `index.php` because this package is a
  pixel-faithful design handoff. For an editable production build, move the
  repeated copy into ACF fields or the block editor.
- The theme is intentionally a single-page theme. WordPress's normal header,
  footer and loop are not used in this design.
