# WordPress handoff

The homepage is also supplied as a framework-free, static WordPress theme so the
approved design can be reproduced **one-to-one** in WordPress without rebuilding
the layout in a page builder.

## Local links

- React preview: `http://127.0.0.1:5173/`
- WordPress-ready static preview: `http://127.0.0.1:5173/wordpress-preview/`
- Theme download: `http://127.0.0.1:5173/gs-property-group-wordpress-theme.zip`

## Theme package

The source is in [`wordpress-theme/gs-property-group`](wordpress-theme/gs-property-group).

| File | Purpose |
| --- | --- |
| `index.php` | The complete homepage markup (header, hero, pathways, about, process, enquiry, FAQ, final CTA, footer). |
| `assets/site.css` | The compiled, framework-free stylesheet, including responsive rules and interactive states. |
| `assets/site.js` | Vanilla JavaScript for the scrolled header, active navigation, accessible mobile drawer, FAQ accordion, audience selector and form variants. |
| `functions.php` | Enqueues the fonts, stylesheet and script. |
| `style.css` | WordPress theme metadata. |
| `screenshot.png` | Theme preview image. |

## Install in WordPress

1. Download the zip above.
2. Go to **Appearance → Themes → Add New → Upload Theme**.
3. Upload `gs-property-group-wordpress-theme.zip`, install and activate.
4. Open the site root. The homepage is rendered by the theme.

## Important production notes

- The enquiry form is a visual preview. Connect it to Contact Form 7, WPForms,
  Gravity Forms or a custom `admin-post.php` handler before launch.
- The content is intentionally hardcoded in `index.php` for pixel accuracy. For a
  fully editable production site, move the copy into ACF fields or block-editor
  patterns while keeping the same class names and section structure.
- The theme is a single-page design theme and does not use the standard
  WordPress header/footer/loop templates.
- The desktop navigation switches to the compact menu below **1360px**, based on
  the real space needed by the seven labels, the telephone number and the CTA.
