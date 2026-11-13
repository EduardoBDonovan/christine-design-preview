# Website design previews

Four responsive, frontend-only concepts for Joejo + Nebria and CKlein Properties.

- `joejo-light/`: a light fragrance storefront
- `joejo-dark/`: a darker fragrance storefront
- `sold/`: a sample closings portfolio with filters and property previews
- `renovations/`: three renovation presentations: photo pair, tap-to-compare, and project story

Open `index.html` through a local static server, or deploy the root to GitHub Pages. There is no build step or package installation.

## Preview behavior

Menus, dialogs, example property filters, and before/after controls work locally in the browser. A sample shopping bag exists only in memory within the current page and resets on navigation. There are no payments, contact submissions, analytics, cookies, database, or production-site integrations.

All photographs are generated illustrations. Product descriptions and property/project content are examples, not current inventory, actual transactions, or completed client work. The UI labels this explicitly. Production copy and imagery must be supplied and reviewed separately.

Images were generated with the built-in image generation tool and compressed to two WebP sizes. They are bundled locally; there are no runtime third-party asset requests.

The renovation preview accepts `?view=pair`, `?view=toggle`, or `?view=story` for direct links. Each view includes enlarged photographs and explicit Before/After labels. The story view includes selectable finish and lighting notes.

## Hosting

Deploy the `main` branch root on GitHub Pages. `.nojekyll` keeps this a static deployment. Relative asset and navigation paths support the `/christine-design-preview/` project path. The custom 404 return link uses that project path.

Search indexing is discouraged with `noindex` metadata and `robots.txt`. This is a public preview, not an access control mechanism.

## Local review

Run `python3 -m http.server 4173 --bind 127.0.0.1` in this folder. Review at 390×844 and 1440×900. Local QA artifacts and asset-generation prompts are kept in the ignored `review/` directory and are not published.
