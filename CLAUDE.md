# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bundle install                  # install gems (first-time setup; requires Ruby 3.2.x)
bundle exec jekyll serve        # dev server with live-reload at http://localhost:4000
bundle exec jekyll build        # one-off build into _site/
```

There is no test suite, no linter, and no JS/CSS build step. The site is plain Jekyll + vanilla CSS/JS.

## Architecture

Jekyll static site for nagmalive.com, deployed via GitHub Pages. The `CNAME` file at the repo root maps the Pages deployment to the custom domain — do not remove it. The `github-pages` gem (single dependency in `Gemfile`) pins Jekyll and plugins to whatever GitHub Pages currently supports; do not upgrade Jekyll independently.

### Page composition pattern

Pages are thin shells that compose includes. `index.html` is literally six `{% include %}` calls — all section content lives in `_includes/` (hero, features, app-specs, musicians, testimonial, cta-banner, contact-form, app-store-badges, header, footer, head). When changing a section that appears on the home page, edit the include, not `index.html`.

Three layouts in `_layouts/`:
- `default.html` — head + header + `{{ content }}` + footer + global `mobile-nav.js`
- `page.html` — extends default, wraps content in `.page-header` + `.container--narrow`
- `post.html` — for blog posts under `_posts/`

`_config.yml` sets `defaults` so every page gets `layout: page` and every post gets `layout: post` automatically. `index.html` is overridden to use `layout: default` because it manages its own hero/sections. Posts use the permalink `/blog/:title/`.

### Styling

CSS lives in `assets/css/` and is loaded in `_includes/head.html` in this exact order — keep it:

1. `tokens.css` — CSS custom properties only (colors, type scale, 8px spacing scale, radii, shadows, transitions). The whole design system is defined here.
2. `base.css` — element resets and typography defaults
3. `components.css` — reusable component classes (`.btn`, `.card`, `.accordion`, `.contact-form`, etc.)
4. `layout.css` — page-level layout (`.container`, `.grid`, `.section`, `.page-header`)

Theme is dark (`--color-bg: #171712`) with gold (`#FAC738`) and teal (`#008080`) accents. Fonts are Playfair Display (display) + Open Sans (body), loaded from Google Fonts with `preconnect`. No CSS preprocessor — write vanilla CSS that uses the tokens.

### JavaScript

Three small vanilla-JS files in `assets/js/`, each an IIFE that no-ops if its target element is missing. Loaded individually per page (not bundled):

- `mobile-nav.js` — loaded globally by `default.html`
- `accordion.js` — loaded by `faqs.html` only
- `contact-form.js` — loaded by `about.html`; intercepts the form submit and POSTs JSON to Formspree (`https://formspree.io/f/mlgpaqpk` → support@nagmalive.com). When adding the contact form elsewhere, you must also include this script.

### Content data

YAML in `_data/` is the source of truth for repeating content — edit these instead of editing markup:

- `navigation.yml` — header nav links
- `faqs.yml` — FAQ accordion items (rendered by `faqs.html` via `{% for faq in site.data.faqs %}`)
- `musicians.yml` — musician cards on the home page
