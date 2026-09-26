# NagmaLive Website

The official website for [NagmaLive](https://nagmalive.com) — the ultimate Indian classical music practice companion for Tabla, Kathak, and Lehra.

Built with Jekyll and hosted on GitHub Pages.

## Local Development

```bash
# Requires Ruby 3.x
bundle install
bundle exec jekyll serve
```

Then visit `http://localhost:4000`.

## Project Structure

```
_layouts/        # default, page, post
_includes/       # header, footer, hero, features, contact form, etc.
_posts/          # Blog posts (Markdown)
_data/           # musicians.yml, faqs.yml, navigation.yml
assets/
  css/           # tokens, base, components, layout
  js/            # mobile-nav, accordion, contact-form
  images/        # All site images and favicon set
pages/           # Privacy policy
```

## Pages

- **Home** — Hero, features, stats, musicians, testimonial, download CTA
- **About** — Origin story, mission, contact form
- **FAQs** — 13 Q&A pairs in an accordion
- **Lehra** — Educational content about lehra/nagma
- **Blog** — 4 posts on tabla, taal, lehra, and Kathak
- **Privacy Policy** — Data practices and user rights

## Contact Form

The contact form submits to [Formspree](https://formspree.io) which forwards emails to support@nagmalive.com.

## Design System

- **Theme:** Dark background (#171712) with gold (#FAC738) and teal (#008080) accents
- **Typography:** Open Sans (body), Playfair Display (headings)
- **Grid:** 8px spacing scale
- **CSS:** Vanilla CSS with custom properties (no build step)
