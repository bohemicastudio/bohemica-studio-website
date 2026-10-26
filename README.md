<p align="left">
<a href="https://www.bohemicastudio.com" target="_blank">
	<img src="./source/images/symbol.svg" alt="Bohemica symbol" height="64" />
</a>
</p>

<p align="left">
<a href="https://www.bohemicastudio.com" target="_blank">
	<img src="./source/images/title.svg" alt="Bohemica title" height="136" />
</a>
</p>

---

The website of [Bohemica Studio](https://www.bohemicastudio.com) – a small, fast, bilingual (English/Czech) static site.

It started in 2021 as an experiment with [Eleventy](https://www.11ty.dev/) as a lightweight alternative to bundler-heavy setups, originally as a client-rendered single-page app. Since 2026 every page is **rendered at build time**: all copy is in the HTML, so search engines and AI agents can read it, and JavaScript only adds the interactions (animations, slide-over, menus).

## How it works

- **Eleventy 3** renders the pages from Nunjucks templates in `source/`.
- **One page per language** – `/en/` and `/cs/` (+ `/` which serves English and sends returning Czech visitors to `/cs/`).
- **Real project pages** – `/en/projects/<slug>/`, `/cs/projekty/<slug>/`. On the homepage they open in a slide-over (the page is fetched and the URL is kept in sync); visited directly, they are regular pages.
- **Translations** live in `source/data/i18n/{en,cs}.js`, the project list in `source/data/projects.js`, URLs in `source/data/routes.js`.
- **Tailwind CSS 4** (`source/assets/styles/`) – the Tailwind 2.2 colour palette is kept 1:1 in `palette.css`.
- **Alpine.js 3** + a few small modules (`source/assets/scripts/`), bundled by **esbuild**. Animations use the Web Animations API.
- **Images** – every `<img>` is processed by `@11ty/eleventy-img` into AVIF/WebP with width/height and lazy loading. Use `eleventy:widths` + `sizes` on large images.
- **SEO & AI agents** – canonical/hreflang, Open Graph images (generated in `lib/og-images.js`), JSON-LD (`lib/structured-data.js`), `sitemap.xml`, `robots.txt`, `llms.txt`.
- **Contact form** – a plain HTML form posting to [Formspark](https://formspark.io) (works without JavaScript; `contact-form.js` sends it in the background). Calls are booked via Calendly.
- **Analytics** – [Simple Analytics](https://www.simpleanalytics.com) (no cookies).
- **Hosting** – [Render](https://render.com) static site, built from `master` on every push. `render.yaml` documents the settings: build command, security and caching headers, and redirects from the old SPA URLs. There is deliberately no catch-all rewrite, so unknown URLs get `404.html` with a real 404 status. GitHub Actions only checks that the site builds.

## Commands

We use [pnpm](https://pnpm.io/).

```
pnpm install    # install dependencies
pnpm dev        # local server with live reload at http://localhost:8080
pnpm build      # production build into build/
pnpm repos:snapshot  # refresh lib/repos-snapshot.json (used when the GitHub API is unavailable)
```

Optional environment variables: `SITE_URL`, `GITHUB_TOKEN` (avoids GitHub API rate limits when fetching the repository cards).

## Free assets

- [Handz](https://www.handz.design/)
- [3D business icons](https://www.behance.net/gallery/98190221/Business-3D-Icons-Free)
- [Device mock-ups](https://www.ls.graphics/free-mockups)
