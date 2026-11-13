# Website design previews

Static GitHub Pages concepts for Joejo + Nebria and CKlein Properties. No build step, package installation, database or production-site integration.

- `joejo-light/` and `joejo-dark/`: Daylight and Evening storefronts, each with candle and Home + Body catalogs, 15 scent pages, Luxe Cases, sample sets and a product configurator.
- `sold/`: concise photo-led portfolio with property enlargement and filters.
- `renovations/`: three staggered Before/After projects (kitchen, bathroom and living room) with project links and an enlarged comparison dialog. Older `?view=` links still open this simplified page.

## Original-scope alternatives

`current-sites/joejo/` and `current-sites/cklein/` use actual screenshots captured November 13, 2026, with optional HTML/CSS annotations. They preserve the current site appearance rather than reconstructing or redesigning it. CKlein includes a desktop/mobile Sales view and a review-only renovation detail; the two new closing entries are described at their intended insertion point, not shown as already published. The original quote is $300 for review plus both closing entries. The free Joejo + Nebria Askka license/preview-feasibility check includes no storefront design implementation. These pages do not claim an audit or safe demo import has been completed.

Only public-facing screenshot assets are bundled. Raw source captures, asset manifests, correspondence and MLS information remain in ignored local review files. No WordPress/admin code, analytics, forms, account sessions or MLS private remarks are published.

## Preview behavior

Candle and fragrance pages support six case colors or no case, format switching, quantity, price changes and a preview bag. The Luxe Cases page supports both case sizes. Scents can be filtered by family and searched by name or note. Sample sets can be added to the bag.

Case selection shows larger, background-free edits of the catalog case photos, selected color and price. Both formats and all six colors use transparent WebP; original photographs remain bundled for reference. The Evening palette continues across every catalog, product, scent, case, sample and bag view. Catalog selectors use compact underline tabs and a single search field across both themes. Decorative sequence numbers have been removed from the concept tiles, renovations and scent lists. Action arrows use inline vectors for consistent rendering across devices.

The bag uses session storage across preview pages and themes, with memory-only fallback if storage is unavailable. It contains only selected catalog IDs, colors and quantities. There are no payments, contact submissions, analytics, accounts, cookies or external application requests.

## Content and images

Product names, signature notes, prices and case options reflect the public Joejo + Nebria catalog reviewed November 12, 2026. They are a static design snapshot, not live stock or a store checkout. Scent-family groupings are editorial navigation choices for this preview.

Catalog product, case and sample photos are from the existing Joejo + Nebria site, bundled locally as WebP. Case cutouts are AI-assisted background-removal edits for this design preview. Homepage hero settings/products and fictional real-estate images were generated for these concepts. Bathroom and living-room before/after pairs are new AI-generated illustrative assets; each is displayed as two CSS-clipped halves without altering the source image. Property/project content is illustrative and is labeled in the UI. Actual closing and renovation photographs would replace it in a finished site.

Public source references: [Candles](https://joejonebria.com/candles/), [Home + Body](https://joejonebria.com/home-body-fragrance-spray/), [Luxe Cases](https://joejonebria.com/luxe-cases/), [Samples](https://joejonebria.com/fragrance-samples/).

## Hosting and local review

GitHub Pages serves the `main` branch root. `.nojekyll` keeps it static, and relative paths support `/christine-design-preview/`. `robots.txt` and noindex metadata discourage indexing; the preview is public.

Run `python3 -m http.server 4173 --bind 127.0.0.1` here to review locally. Current HTML/CSS/JS is authoritative. Historical one-time generation scripts in ignored `review/` must not be rerun over the reviewed pages. QA screenshots, asset provenance and evidence remain in that ignored directory.

## Current-site recommendations

The `current-sites/` views use actual screenshots captured November 13, 2026, with separate desktop and mobile suggestions for six Joejo + Nebria page types and CKlein Sales/renovations. Select a page, choose a device, and select any note to locate the relevant area. The original quote is summarized once in a collapsed disclosure; recommendations are not restricted by implementation scope. No live WordPress changes are made.
