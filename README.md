# Website design previews

Static GitHub Pages concepts for Joejo + Nebria and CKlein Properties. No build step, package installation, database or production-site integration.

- `joejo-light/` and `joejo-dark/`: Daylight and Evening storefronts, each with candle and Home + Body catalogs, 15 scent pages, Luxe Cases, sample sets and a product configurator.
- `sold/`: concise photo-led portfolio with property enlargement and filters.
- `renovations/`: three staggered Before/After projects (kitchen, bathroom and living room) with project links and an enlarged comparison dialog. Older `?view=` links still open this simplified page.

## Preview behavior

Candle and fragrance pages support six case colors or no case, format switching, quantity, price changes and a preview bag. The Luxe Cases page supports both case sizes. Scents can be filtered by family and searched by name or note. Sample sets can be added to the bag.

Case selection shows the actual catalog case photograph, selected color and price. Catalog selectors use compact underline tabs and a single search field across both themes. Decorative sequence numbers have been removed from the concept tiles, renovations and scent lists. Action arrows use inline vectors for consistent rendering across devices.

The bag uses session storage across preview pages and themes, with memory-only fallback if storage is unavailable. It contains only selected catalog IDs, colors and quantities. There are no payments, contact submissions, analytics, accounts, cookies or external application requests.

## Content and images

Product names, signature notes, prices and case options reflect the public Joejo + Nebria catalog reviewed November 12, 2026. They are a static design snapshot, not live stock or a store checkout. Scent-family groupings are editorial navigation choices for this preview.

Catalog product, case and sample photos are from the existing Joejo + Nebria site, bundled locally as WebP. Homepage hero settings/products and fictional real-estate images were generated for these concepts. Bathroom and living-room before/after pairs are new AI-generated illustrative assets; each is displayed as two CSS-clipped halves without altering the source image. Property/project content is illustrative and is labeled in the UI. Actual closing and renovation photographs would replace it in a finished site.

Public source references: [Candles](https://joejonebria.com/candles/), [Home + Body](https://joejonebria.com/home-body-fragrance-spray/), [Luxe Cases](https://joejonebria.com/luxe-cases/), [Samples](https://joejonebria.com/fragrance-samples/).

## Hosting and local review

GitHub Pages serves the `main` branch root. `.nojekyll` keeps it static, and relative paths support `/christine-design-preview/`. `robots.txt` and noindex metadata discourage indexing; the preview is public.

Run `python3 -m http.server 4173 --bind 127.0.0.1` here to review locally. Current HTML/CSS/JS is authoritative. Historical one-time generation scripts in ignored `review/` must not be rerun over the reviewed pages. QA screenshots, asset provenance and evidence remain in that ignored directory.
