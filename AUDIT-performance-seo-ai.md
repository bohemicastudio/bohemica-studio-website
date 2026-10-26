# Bohemica Studio website — Performance, SEO & AI-agent readiness audit

**Date:** 2026-10-26
**Scope:** `master` @ `144baa7` + live site https://www.bohemicastudio.com
**Method:** source review, live HTTP checks (`curl`, including AI-crawler user agents), Lighthouse 12.2.1 (mobile emulation, live site)

---

## Status (branch `refactor/modernize-prerender`)

Most findings are addressed by the rebuild: Eleventy 3, Tailwind 4, Alpine 3, esbuild, eleventy-img, and content rendered at build time.

Lighthouse mobile, run against the new build served locally:

| | Before (live) | After (local build) |
|---|---|---|
| Performance | 53 | 98 |
| LCP | 11.0 s | 2.3 s |
| Best Practices | 68 | 100 |
| Accessibility | 92 | 96 |
| Page weight | 1.48 MB | 303 KB |

**Done:** §1–5, §7–9, §11–16 (code side), §A1–A5. That includes a contact form (Formspark, with WebMCP attributes), Calendly booking and Simple Analytics. Smallchat and the Twitter links are removed. Added since: a privacy policy (EN/CS), company details in the footer (Poweron s.r.o.), the Žabka case study, team photos and testimonials from Toyota (TMMCZ) and Žabka.

**Hosting is Render** (static site), not Apache, so `.htaccess` was never used and has been removed. Its rules now live in `render.yaml`.

**Needs action on Render or by the team:**
- **§6 and §10:** delete the `/* → /index.html` rewrite rule in the Render dashboard. Unknown URLs then get `404.html` with a real 404 status. Apply the headers and redirects from `render.yaml`, either by linking it as a Blueprint or by entering them in the dashboard.
- **Render build settings:** build command `corepack enable && pnpm install --frozen-lockfile && pnpm build`, publish directory `build`, env `SKIP_INSTALL_DEPS=true`. A `GITHUB_TOKEN` env var is optional.
- **Disable the GitHub Pages mirror:** the old `gh-pages` branch is a duplicate copy of the site.
- **Colour contrast:** white text on the blue/cyan/teal chips and the first "Why" panel is a design decision.
- **§A4:** an FAQ section is still open.
- **Content freshness (§15):** the Czech translations I added should get a native review.

---

## TL;DR

The design is strong; the delivery architecture is what holds the site back. Nearly all of the site's text is injected by JavaScript at runtime: Alpine `x-text` bindings read copy from Spruce stores, the six homepage sections are `fetch()`ed after load, and case studies are fetched into a slide-over. That one decision causes most of the problems:

- **Performance:** LCP is **11.0 s** on mobile and FCP is **5.1 s** (Lighthouse Performance **53**).
- **SEO:** the raw HTML has an empty `<h1>`, empty `<h2>`s, no case-study URLs that can be indexed, and no Czech version that can be indexed.
- **AI agents:** GPTBot, ClaudeBot and PerplexityBot all get `200`, but they don't run JavaScript. In the raw HTML they see roughly *"Bohemica Studio … 00.00.0000 … Our Twitter Our LinkedIn … Section name I"*. For AI answer engines the site is effectively blank.

**The main fix:** keep Eleventy and Alpine, but **pre-render the content at build time**:
- real `/en/…` and `/cs/…` pages
- sections included rather than fetched
- one real page per case study

Keep Alpine for interactivity only. Most of the findings below are fixed by this change, or become trivial after it.

### Scorecard (live, Lighthouse mobile)

| Category | Score | Key metrics |
|---|---|---|
| Performance | **53** | FCP 5.1 s · LCP 11.0 s · Speed Index 7.4 s · TTI 11.2 s · TBT 260 ms · CLS 0 |
| Accessibility | 92 | colour contrast, unnamed iframe |
| Best Practices | **68** | mixed content, viewport, font size, console errors |
| SEO | 100 ⚠️ | misleading: Lighthouse renders JS and checks only basic tags |

Page weight: 1.48 MB across 89 requests. Server response: 20 ms, so hosting is not the bottleneck.

---

## Priority list

P0 = do first (high impact). P1 = next. P2 = nice to have. Effort: S < ½ day, M ≈ 1–3 days, L = a week or more.

| # | Area | Finding | Pri | Effort |
|---|---|---|---|---|
| 1 | SEO / AI / Perf | Content is rendered only on the client (empty H1/H2, sections fetched, copy in JS) | P0 | L |
| 2 | SEO / AI | Case studies have no URLs that can be indexed | P0 | M (with #1) |
| 3 | Perf | 14 synchronous render-blocking scripts in `<head>` | P0 | S |
| 4 | Perf | Hero / LCP held at `opacity:0` until JS animations run | P0 | S |
| 5 | Perf | HTML is never minified in production (env-var bug) | P0 | S |
| 6 | Perf | No effective browser caching (`max-age=0`), `.htaccess` never deployed | P0 | S |
| 7 | Best practices | Dead or broken third parties (Umami over `http://`, IP-lookup with no API key) | P0 | S |
| 8 | SEO / AI | No sitemap, canonical, OG tags, JSON-LD or `llms.txt`; `robots.txt` is empty | P1 | S–M |
| 9 | SEO | i18n can't be indexed: hard-coded `lang="en"`, no hreflang, language picked on the client | P1 | M (with #1) |
| 10 | SEO | Soft 404s: every unknown path returns `200` with the homepage | P1 | S |
| 11 | Perf | Images: no dimensions, no `srcset`, all breakpoint variants download, multi-MB PNGs and a 10 MB MP4 | P1 | M |
| 12 | AI | Contact is only possible via a chat widget; email isn't a link; booking link is commented out | P1 | S |
| 13 | Mobile / BP | Viewport meta is fixed at `width=400`, `initial-scale=0.8` | P1 | S |
| 14 | Perf | JS stack is deprecated and oversized (Alpine 2, Spruce, magic-helpers, Tippy + Popper, …) | P2 | M |
| 15 | Perf | CSS is 163 KB minified, with a base64 font inlined; Google Fonts are render-blocking | P2 | S–M |
| 16 | SEO / A11y | Generic titles and alts, clickable `<div>`/`<img>` used as links, stale content | P2 | S |

---

## 1. Architecture: client-only rendering (root cause)

**Evidence**
- `source/includes/components/section-intro.njk:5`: `<h2 … x-text="$store['global'].return('sections.….title')"></h2>` renders an empty `h2`.
- `source/index.njk:83`: `<h1 … x-text="$store['global'].return('head.title')"></h1>` renders an empty `h1`.
- `source/index.njk:274–311`: the What, How, Repos, How much, Who and Where sections are each loaded via `$fetch('./sections/*.html')` in `x-init`.
- `source/script/store.js`: all hero and section copy, in both languages, lives in JS objects.
- `source/script/store.js` (`project.loadContent`): case studies are fetched from `./projects/<file>.html` and injected with `innerHTML`.
- Live raw HTML (118 KB) has **about 1.7 KB of visible text**, and most of that is leaked Alpine attribute code.

**Impact**
- Google renders JS, but with a delay and a budget. Bing and others are partial. AI crawlers (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, CCBot) **do not render JS at all**.
- The fetch waterfall (HTML → 14 blocking scripts → Alpine init → 6 section fetches → images) is the main reason LCP and TTI are slow.

**Fix**: pre-render with Eleventy, which is already in place:
1. Move translations out of `store.js` into Eleventy global data (for example `source/data/i18n/en.json` and `cs.json`). Render text directly in Nunjucks: `<h1>{{ t.head.title }}</h1>`.
2. Use Eleventy pagination over the languages to emit `/en/index.html` and `/cs/index.html`. `/` can redirect (301) or serve EN with an `x-default` hreflang.
3. Replace each `$fetch('./sections/x.html')` with `{% include %}`, so the sections arrive in the first HTML response.
4. Keep Alpine for interactivity only: menus, slide-over, tooltips and animations. Language switching becomes a normal link to the other locale's URL.
5. Long term, consider upgrading Eleventy to 3.x for its built-in i18n plugin and image pipeline. Astro is an alternative if a rewrite is ever on the table. Neither is required for this fix.

## 2. Case studies can't be indexed

**Evidence**
- `https://www.bohemicastudio.com/en/projects/t-mobile` returns the homepage shell, with the same `<title>` and description as `/`.
- The real content is at `/projects/media-server.html`. That is a fragment with no `<head>` or `<title>`, and it is still crawlable, so it shows up as an orphan thin page.
- Links to projects are built at runtime (`x-bind:href="window.router.getPath(...)"`), so the raw HTML contains no `<a href>` to any case study.

**Fix**
- Generate `/en/projects/<slug>/index.html` and `/cs/projekty/<slug>/index.html` as full pages, each with its own `<title>`, description, OG image (the existing `preview-3d.webp`), and `CreativeWork` JSON-LD.
- Keep the slide-over as progressive enhancement: intercept the click, fetch the page, and show it in the panel. A direct hit or a crawler gets the full page.
- Add `<meta name="robots" content="noindex">` to the legacy fragments, or stop emitting them.

## 3. Render-blocking scripts

**Evidence**: `source/includes/default.njk:39–53` has 15 `<script>` tags in `<head>`. Only `alpine.js` has `defer`. The other 14 are synchronous and block first paint: helpers, magic-helpers, toggle, arrive, anime, spruce, navigo, popper, tippy, medium-zoom, dayjs, animation, store and router. FCP is 5.1 s.

**Fix**
- Quick win: add `defer` to all of them. Deferred scripts still run in document order, so the dependency chain is preserved. Two things need care:
  - Move `alpine.js` to the end of the list, so Spruce and the stores register before Alpine boots.
  - Inline `onload="anime(…)"` handlers on hero images can fire before a deferred `anime.js` has run. Move those into `animation.js`; §4 removes them anyway.
- Better: bundle them into one file with esbuild (a single dev dependency, no config file needed), then `defer` that file.

## 4. LCP held back by intro animations

**Evidence**: `source/index.njk:117–204`. All hero images start at `opacity: 0` and are revealed by `anime()` in `onload`. The H1 and subtitle start empty and fade in after delays of up to 3.2 s. LCP is 11.0 s.

**Fix**
- Render the hero text in HTML and visible from the start, or animate with a CSS `@keyframes` fade that starts immediately and lasts ≤ 300 ms.
- Give the LCP image `fetchpriority="high"`, and preload it if it's a background image.
- Don't gate the first paint on JS.

## 5. HTML is never minified (bug)

**Evidence**
- `transforms/htmlmin.js:8` minifies only when `process.env.NODE_ENV === "production"`.
- `package.json` `build:eleventy` sets only `ELEVENTY_ENV=production`.
- `deploy` and `build:gh-pages` set `NODE_ENV=deploy`.
- As a result, live HTML is the Prettier-formatted output: the homepage is 118 KB and `sections/what.html` is 40 KB raw.

**Fix**: in `transforms/htmlmin.js`, check `process.env.ELEVENTY_ENV !== "production"`, or set `NODE_ENV=production` in `build:eleventy`. Also skip `prettier.format()` in production; it only slows the build.

## 6. Caching

**Evidence**
- Every live asset (CSS, JS, images) is served with `cache-control: public, max-age=0, s-maxage=300`.
- `source/.htaccess` has a 30-day rule, but it is **not copied to `build/`**. It isn't an Eleventy template format and isn't in `addPassthroughCopy`, and `build/` contains no `.htaccess`. (Also check whether the WEDOS host honours `.htaccess` at all.)
- `?v={% version %}` is `Date.now()` per build, which invalidates **every** asset on every deploy, even unchanged ones.

**Fix**
- Fingerprint files by content hash (for example `style.3f9a1c.css`) and serve `/images`, `/script`, `/style*.css` and fonts with `Cache-Control: public, max-age=31536000, immutable`.
- Serve HTML with `max-age=0, must-revalidate`.
- Set this in the WEDOS/CDN config, or passthrough-copy `.htaccess` if Apache is in front.

## 7. Broken or questionable third parties

| Script | Problem | Fix |
|---|---|---|
| Umami, `default.njk` (`http://umami-test.nuxtjs.devb.space/umami.js`) | `http://` on an HTTPS page is blocked as mixed content (fails Best Practices). The host also timed out. Analytics is effectively off. | Point to a production Umami over HTTPS, or remove it. |
| `extreme-ip-lookup.com`, `source/script/router.js` | Called on every visit without a language in the URL. Now returns `"No API Key found"`, so geo-detection silently always falls back to EN. It also sends visitor IPs to a third party without consent (GDPR). | Remove it. Use `navigator.language`, or an `Accept-Language` redirect at the edge. |
| `browser-update.org`, `default.njk` | Its 2021 config is irrelevant today. | Remove it. |
| GitHub API (`index.njk:85`, `sections/repos.njk`) | Unauthenticated client calls are limited to 60 requests per hour per IP. It also downloads contributor avatars at full size (one is **295 KB**). | Fetch at build time (Eleventy data file) and request avatars with `&s=96`. |
| Smallchat | Loads on every page view and adds an iframe without a `title` (an a11y fail). | Lazy-load it on the first interaction or after idle. |

Lighthouse also logged an Alpine runtime error: `TypeError: Cannot read properties of undefined (reading 'forEach')` in `alpine.js`.

## 8. Discovery basics missing

| Item | Status | Recommendation |
|---|---|---|
| `robots.txt` | `User-agent: *` only. No rules, no `Sitemap:` line. | Add `Allow: /`, a `Sitemap:` line, and an explicit AI-crawler policy (see §A3). |
| `sitemap.xml` | Missing. `/sitemap.xml` returns `200 text/html` (the homepage). | Generate it with Eleventy, covering both locales and all case studies, with `xhtml:link` hreflang. |
| `<link rel="canonical">` | Missing | Add one per page. |
| Open Graph / Twitter cards | Missing | Shared links on LinkedIn and Slack currently show no image or description. Add `og:title`, `og:description`, `og:image` (1200×630), `og:locale` and `og:locale:alternate`. |
| JSON-LD | Missing | See §A2. |
| `llms.txt` | 404 | See §A1. |
| `<title>` | Always `Bohemica Studio` | For example *"Bohemica Studio: Web & mobile app development, UI/UX and branding"*, with a unique title per case study. |

## 9. Internationalisation

- `default.njk:2` hard-codes `<html lang="en">`; there is a TODO about this in the template.
- No `hreflang` tags.
- The language is chosen from `localStorage` or IP lookup on the client, so crawlers only ever see EN.
- Several Czech strings are empty, for example `sections.what.subtitle: ''` in `store.js`.
- Bug in `router.js:9`: when `localStorage.language` is undefined, the ternary returns `undefined` instead of `'en'`.

Fixed by §1 with real `/en/` and `/cs/` URLs, `lang` set per page, and reciprocal `hreflang` plus `x-default`.

## 10. Soft 404s

The host rewrites every unknown path to `index.html` with status `200`. Google treats this as soft 404s, and it can index junk URLs. `source/404.html` is the old GitHub Pages SPA redirect hack, titled "Single Page Apps for GitHub Pages", and doesn't fit the current host.

**Fix**: once pages are pre-rendered, drop the catch-all rewrite. Serve a real branded `404.html` with status 404.

## 11. Images and media

| Finding | Evidence |
|---|---|
| No `width`/`height` on any `<img>` | 0 of 121 `<img>` tags in templates. CLS is 0 today only because content arrives late. |
| No responsive `srcset`/`sizes` | Lighthouse: 471 KiB potential savings. |
| Off-screen images not deferred | 454 KiB potential savings. 84 of 121 have `loading="lazy"`, but hero variants don't. |
| All three hero layouts download | Desktop, tablet and mobile hand sets (9 images) all load regardless of viewport. Hidden `<img>` elements still download. |
| `media` attribute used on `<img>` | `sections/where.njk`, `sections/how-much.njk`. `media` only works on `<source>`, so it is ignored. |
| Very heavy originals | `project/mmt/4.png` 1.5 MB, `branding/7.png` 1.1 MB, `branding/7.webp` 845 KB. `images/` totals 33 MB. |
| 10 MB autoplay video | `images/project/superflow/prototype.mp4` with `autoplay controls`, but no `muted playsinline`, `preload`, or `poster`. |
| 392 KB SVG map | `images/map.svg` (26 KB on the wire, but costly to parse). |
| Generic alt text | Every project preview uses `alt="Our process"` (`components/project-example.njk`). Decorative hands use `alt="Background"`; it should be `alt=""`. |

**Fix**
- Use `@11ty/eleventy-img`. It is already a dev dependency, and there is a TODO for it in `.eleventy.js:21`. Generate AVIF and WebP at 3–4 widths, with dimensions emitted automatically.
- Re-encode the MP4 to under 2 MB (H.264 at ~1 Mbps, or AV1), and add `muted playsinline preload="none" poster`.
- Run SVGO on `map.svg`.
- Use real art-direction `<picture><source media>` for the hero, so only one layout downloads.

## 12. Viewport and mobile

`default.njk:10`: `width=400, initial-scale=0.8, minimum-scale=0.8, maximum-scale=2.0`, plus `body { min-width: 400px }`. This fails the Lighthouse *viewport* and *font-size* audits, and on phones narrower than 400 px it forces a zoomed-out layout.

**Fix**: use `width=device-width, initial-scale=1` and fix the layouts that broke below 400 px.

## 13. JavaScript stack (modernisation)

Lighthouse reports 168 KiB of unused JS. Several libraries are end-of-life or redundant:

| Library | Status | Replacement |
|---|---|---|
| Alpine 2 + Spruce + alpine-magic-helpers | All deprecated or archived | Alpine 3 (built-in `Alpine.store`, native `fetch`) |
| Popper + Tippy (≈ 30 KB br) | Used for a few tooltips | CSS tooltips or the Popover API |
| dayjs | Used to format one date | `Intl.DateTimeFormat` |
| arrive | Watches for injected `[data-navigo]` links | Unnecessary once content is pre-rendered |
| Navigo | SPA router | Plain links; a small click interceptor for the slide-over |
| anime.js | Intro and slide-over animations | Keep, or move to CSS / WAAPI |

## 14. CSS and fonts

- `style.css` is **163 KB minified** (28 KB brotli). It includes a 17 KB base64 `Optician Sans` font inlined in `source/style/fonts.css`, which is used in only 2 places, and Tailwind 2 output. Upgrading Tailwind (v3 JIT, or v4) typically yields under 30 KB raw.
- Google Fonts CSS is a render-blocking third-party request chain (googleapis → gstatic). Self-host DM Sans and DM Mono as subsetted `woff2` files with `<link rel="preload">` and `font-display: swap`. Move Optician Sans to its own `woff2` file.
- Lighthouse flags failing **colour contrast**; check the light-grey text on the grey sections.

## 15. Content and trust signals

- Twitter links should be updated to X, or removed if the account is inactive.
- "Latest project: T-Mobile" and the ApostropheCMS partner badge should be reviewed for freshness.
- `README.md` shows a Lighthouse badge from **2021-07-29**. Regenerate it or drop it.
- `where.njk` says *"You can also schedule a call"*, but the scheduling link is commented out in `index.njk:21`.
- `bohemica.studio` redirects with **302**. It should be **301** to pass signals.
- Security headers: only `X-Content-Type-Options` is set. Add HSTS, a CSP (a draft is already commented out in `default.njk:11`), and `Referrer-Policy`. These are not ranking factors, but they are trust and best-practice items.

---

## AI-agent readiness

Two audiences need different things:
- **AI crawlers and answer engines** (ChatGPT search, Claude, Perplexity, Google AI Overviews) read raw HTML or text and decide whether to *cite* you.
- **Agentic browsers** (ChatGPT agent, Claude in Chrome, Comet) run JS but operate through the accessibility tree, and need to *complete tasks*. For this site the task is "contact the agency or request a quote".

### A0. Current state
- Access is fine: GPTBot, ClaudeBot and PerplexityBot user agents all get `200`, and the WEDOS protection doesn't block them.
- Content isn't: there are no facts in the raw HTML to cite (§1). An AI asked *"Who builds digital-signage apps in Liberec?"* or *"What does Bohemica Studio charge?"* has nothing to quote.

### A1. Add `/llms.txt` (and optionally `/llms-full.txt`)
Generate it from the same Eleventy data as the pages. Suggested shape:

```markdown
# Bohemica Studio

> Small full-stack development & design studio (Liberec, CZ / Cheltenham, UK) building web & mobile applications, IoT/digital-signage software and brand identities for startups and established companies.

- Contact: team@bohemicastudio.com
- Pricing: hourly-based, with a min–max time range estimated per milestone
- Languages: English, Czech

## Services
- [Web & mobile applications](https://www.bohemicastudio.com/en/#what): …
- [IoT & digital signage](…): …
- [UI/UX design](…): …
- [Branding](…): …

## Case studies
- [T-Mobile: digital signage media server](https://www.bohemicastudio.com/en/projects/t-mobile/): …
- [SlidesLive: subtitle editor](…): …
- [Lancaster Maloney](…): …
- [MMT](…): …
- [Superflow](…): …

## Optional
- [Source code of this website](https://github.com/bohemicastudio/bohemica-studio-website)
```

### A2. Structured data (JSON-LD)
- **Homepage**: `Organization` + `ProfessionalService`, including:
  - `name`, `url`, `logo`, `email`
  - `address` for two locations: Liberec, CZ and Cheltenham, UK
  - `sameAs`: LinkedIn, X, GitHub
  - `knowsAbout`: the tech stack currently shown only as logo images (Vue, Nuxt, Laravel, Strapi, Swift, Kotlin, …)
  - `makesOffer`: one `Service` per specialisation
- **`WebSite`** with `inLanguage` set per locale.
- **Each case study**: `CreativeWork` (or `Article`) with `about`, `creator`, `image` and `inLanguage`.

### A3. Explicit AI-crawler policy in `robots.txt`
For an agency, being cited is pure upside, so allowing these crawlers is recommended. The decision belongs to the business.

```
User-agent: *
Allow: /

# AI search / answer engines
User-agent: OAI-SearchBot
User-agent: ChatGPT-User
User-agent: Claude-SearchBot
User-agent: Claude-User
User-agent: PerplexityBot
Allow: /

# Model training (decide: Allow or Disallow)
User-agent: GPTBot
User-agent: ClaudeBot
User-agent: Google-Extended
User-agent: CCBot
Allow: /

Sitemap: https://www.bohemicastudio.com/sitemap.xml
```

### A4. Make the main conversion something an agent can complete
- Today the only call to action is the **Smallchat bubble**. The copy literally says *"click that button in the right bottom corner"*, and an agent can't use it.
- The email `team@bohemicastudio.com` is a plain `<span>` (`sections/where.njk`), not a `mailto:` link.
- The booking link is commented out.
- **Add**:
  - a visible `<a href="mailto:team@bohemicastudio.com">`
  - a plain HTML contact form (name, email, budget range, project description; labelled `<label for>`; real `<button type="submit">`; posts to Formspree or a tiny endpoint)
  - a booking URL (Cal.com or similar)
- **Optional, emerging**: annotate the form for **WebMCP** (declarative `toolname`/`tooldescription` attributes), so browser agents can call "request a quote" as a tool. This is cheap once the form exists.

### A5. Fix the accessibility tree for browser agents
Agents act on links and buttons, not on click handlers attached to arbitrary elements:
- `index.njk:19`: the logo `<img>` with `x-on:click` should be an `<a href>`.
- `components/git-card.njk:2`: `<div x-on:click="window.open(…)">` should be an `<a href target="_blank" rel="noopener">`.
- The slide-over close and menu toggles should be real `<button>`s with accessible names. Check that `aria-expanded` is set.

### A6. Write facts AI answer engines can quote
- Put concrete, quotable facts in plain text: founding year, team size, locations, industries, technologies, indicative project size or rates, and typical timelines.
- A short **FAQ** section per locale (with `FAQPage` JSON-LD) suits AI Overviews well. For example: "Do you work with clients outside the EU?", "How do you price projects?", "What's a typical timeline?"
- For each case study, state client, problem, solution, stack and outcome in text. Today much of this exists only inside images.

---

## Suggested roadmap

**Week 1: quick wins (no redesign, about 1–2 days)**
1. Fix the HTML minify env check (§5).
2. Add `defer` to all scripts (§3).
3. Set cache headers at the host (§6).
4. Remove the dead Umami, IP-lookup and browser-update scripts (§7).
5. Fix the viewport meta (§12).
6. Add canonical, OG and Twitter tags plus `Organization` JSON-LD in `default.njk` (§8, §A2).
7. Expand `robots.txt` with the AI policy and `Sitemap:` (§A3).
8. Add a `mailto:` link and the booking link back (§A4).
9. Re-encode the 10 MB MP4 and the largest PNGs (§11).

**Weeks 2–3: pre-render (the main fix)**
10. Move translations to Eleventy data and render `/en/` and `/cs/` statically (§1, §9).
11. Inline the sections (§1).
12. Make case studies real pages, with the slide-over as enhancement (§2).
13. Add `sitemap.xml`, hreflang, real 404s, and `llms.txt` generated from the same data (§8, §10, §A1).
14. Move the hero to a CSS-first reveal so LCP isn't gated on JS (§4).
15. Add `eleventy-img` for responsive AVIF/WebP with dimensions (§11).

**Later: modernise**
16. Move Alpine 2 + Spruce to Alpine 3; drop Tippy/Popper, dayjs, arrive and Navigo (§13).
17. Upgrade Tailwind; self-host fonts (§14).
18. Add a contact form with WebMCP annotations and an FAQ (§A4, §A6).

**Expected outcome**: mobile LCP under 2.5 s and Performance 90+, crawlable bilingual pages with case-study landing pages, and a site AI search engines can actually read and cite.
