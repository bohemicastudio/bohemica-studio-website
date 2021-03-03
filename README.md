<p align="left">
<a href="https://bohemica.studio" target="_blank">
	<img src="./source/images/symbol.svg" alt="Bohemica symbol" height="64" />
</a>
</p>

<p align="left">
<a href="https://bohemica.studio" target="_blank">
	<img src="./source/images/title.svg" alt="Bohemica title" height="136" />
</a>
</p>

<p align="left">
<a href="https://snyk.io/test/github/bohemicastudio/bohemica-studio-website?targetFile=package.json" target="_blank"><img src="https://snyk.io/test/github/bohemicastudio/bohemica-studio-website/badge.svg?targetFile=package.json" alt="Known vulnerabilities" data-canonical-src="https://snyk.io/test/github/bohemicastudio/bohemica-studio-website?targetFile=package.json" style="max-width:100%;"></a>
<a href="https://www.bohemica.studio/lighthouse/bohemica_studio.html" target="_blank"><img src="./source/lighthouse/lighthouse.svg" alt="Lighthouse report" style="max-width:100%;"></a>
</p>

---

This site was a bit of an experiment on our behalf as we wanted to run a trial of using Eleventy as a static site generator. It usually takes time to set up a development environment and back-end system just to get a few JavaScript libraries running. That's why there are so many starter projects. We simply wanted to create a **lightweight serverless single-page website**.

The development approach for this site was to get rid of any unnecessary transpilers – get down to the process of web designing as quickly as possible. Specifically, we wanted to avoid using Webpack as the site was meant to be fairly simple. The reasoning is that on many occasions, we found ourselves spending hours debugging Webpack's errors and warnings due to various module related issues.

Nonetheless, there was an exception for the PostCSS preprocessor – in order to build the Tailwind CSS file, handle imports and add prefixes. You could also count in the static site generator Eleventy, which was the main driving force. This gave us almost full control and transparency over the final code.

Another decision was to only use compiled UMD format (i.e. exported as a global variable) for JavaScript libraries. In
comparison, the ES6 version of JavaScript allows us to perform tree shaking on unused code/functions. However, since we
opted out from using any bundler and all the JS libraries we used were already "lightweight" in size, we stuck to UMD. Moreover, some libraries may not even support other module formats, so we did it the "old school" way.

We implemented the i18n capability for two languages using an awesome Alpine.js library. We definitely were stretching the capabilities of the library here a little, but so far so good.

**And why did we do it this way? Well, for once it all works as it should and it was fun doing things differently!**

Just a bit on the UI/UX: the page is fairly long in order to fit necessary information without being too condensed and have enough whitespace. Also, users are likely to scroll quickly through and/or stop at the section that interests them – either visually or context-wise (like with newspaper or magazine).  Lastly, the website was designed as a single-page application (SPA), so there is no need to switch between pages. All new content is loaded dynamically.
  

## Summmary

- single page application
- no backend, no db
- only using UMD format of external JS libraries
- automatic minification of all code files during the build
- global data store
- JS router
- i18n capability
- Nunjucks templating engine
- async section loading with Alpine.js
- browser-native image lazy loading

## Main technology stack

- [Eleventy](https://github.com/11ty/eleventy)
- [Alpine.js](https://github.com/alpinejs/alpine)
- [Spruce](https://github.com/ryangjchandler/spruce)
- [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss)
- [Navigo](https://github.com/krasimir/navigo)
- [Anime](https://github.com/juliangarnier/anime)

## Free assets

- [Handz](https://www.handz.design/)
- [3D business icons](https://www.behance.net/gallery/98190221/Business-3D-Icons-Free)
- [Device mock-ups](https://www.ls.graphics/free-mockups)

## Commands

Disclaimer: we are using [pnpm](https://github.com/pnpm/pnpm) instead of npm or yarn (shhh.. it saves space).

### Install dependencies

```
pnpm install
```

### Working locally

Start a web server with hot-reloading and automatic compilation when a change is detected

```
pnpm run serve
```

### Creating a production build

Copy library files from node_modules, minify HTML, inline/minify CSS and compress JS.

``` 
pnpm run build
```

