# 1845 — commercial proposal / 18:45

Интерактивное коммерческое предложение для **1845 Lounge Bar, Новосибирск, Большевистская 132 / Европейский Берег**.

## Production

https://mishkastrategy.github.io/1845/

## Design concept — 18:45

**18:45 — момент переключения из рабочего дня в свой вечер.** Визуальная система строится на времени, minute marks, timestamps, тёплом переходе «день → вечер» и editorial-типографике. Это B2B-презентация будущего digital-образа 1845, а не официальный гостевой сайт.

## Stack

- semantic HTML5 fragments
- modular CSS custom properties + responsive layout
- vanilla JavaScript
- IntersectionObserver / progressive motion
- zero third-party runtime dependencies
- GitHub Actions + GitHub Pages

## Production build

Исходники остаются модульными в `fragments/`, но production **не зависит от JavaScript для загрузки контента**. `build.mjs` заранее собирает пять HTML-фрагментов в `dist/index.html`, после чего workflow публикует только `dist/` в `gh-pages`.

Это даёт:

- полноценный HTML на первом ответе;
- меньше сетевых запросов;
- более устойчивый SEO/crawler fallback;
- отсутствие boot-зависимости для основного контента;
- чистую production-ветку без README/workflow/source fragments.

## Commands

```bash
npm run check
npm run build
python3 -m http.server 4173 -d dist
```

## Structure

```text
.
├── .github/workflows/pages.yml
├── assets/
│   ├── favicon.svg
│   ├── og.svg
│   └── og.png
├── fragments/
│   ├── 01.html
│   ├── 02.html
│   ├── 03.html
│   ├── 04a.html
│   └── 04b.html
├── styles/
│   ├── base-1.css
│   ├── base-2.css
│   ├── base-3.css
│   └── responsive.css
├── src/content/offer.js
├── build.mjs
├── package.json
├── index.html
├── boot.js
└── script.js
```

`boot.js` остаётся удобным development-loader для исходной оболочки. В production он не используется.

## Commercial config

Все изменяемые коммерческие условия собраны в `src/content/offer.js`: `price`, `discount`, `timeline`, `payment`, `package`, `note`.

## Audit status

После production-аудита исправлены:

- static-first production rendering;
- social preview PNG 1200×630;
- accordion semantics (`aria-controls`, region panels, explicit button types);
- motion pause control for the review marquee;
- focus states and skip-link target;
- low-contrast helper text;
- mobile phone CTA selector;
- clean `dist` deployment to `gh-pages`.
