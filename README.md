# 1845 — commercial proposal / 18:45

Интерактивное коммерческое предложение для **1845 Lounge Bar, Новосибирск, Большевистская 132 / Европейский Берег**.

## Production

https://mishkastrategy.github.io/1845/

## Design concept — 18:45

**18:45 — момент переключения из рабочего дня в свой вечер.** Визуальная система строится на времени, minute marks, timestamps, тёплом переходе «день → вечер» и editorial-типографике. Это не официальный гостевой сайт, а B2B-презентация будущего digital-образа 1845.

## Stack

- semantic HTML5 fragments
- modular CSS custom properties + responsive layout
- vanilla JavaScript
- IntersectionObserver / progressive motion
- GitHub Actions + GitHub Pages
- no production image hotlinks

Проект намеренно не использует тяжёлый runtime и сторонние UI-зависимости: коммерческое предложение остаётся статическим, быстрым и легко разворачивается под `/1845/`. Содержательные секции разделены на HTML-фрагменты и собираются `boot.js`.

## Local run

```bash
python3 -m http.server 4173
```

Открыть `http://localhost:4173`.

## Structure

```text
.
├── .github/workflows/pages.yml
├── assets/
│   ├── favicon.svg
│   └── og.svg
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
├── index.html
├── boot.js
├── script.js
└── README.md
```

## Commercial config

Все изменяемые коммерческие условия собраны в `src/content/offer.js`:

- price
- discount
- timeline
- payment
- package
- note

Публичная страница не показывает технические placeholders.

## Sources / research

Аудит проведён 15.08.2026 по публичным источникам:

- 2ГИС — карточка и отзывы 1845 Lounge Bar, Новосибирск
- Яндекс Карты — отзывы и карточка Lounge Bar 1845
- текущий сайт `deusvox.ru/loungebar1845`
- публичные контакты Telegram / social profiles, указанные в картах и открытых профилях
- локальные market references: Мята Lounge, HookahPlace, Bad Habits
- hospitality references: Soho House, Scarfes Bar, The Standard / Sweeties

Фотографии из 2ГИС/карт не скачиваются и не используются как production assets. Концепция завершена на собственной typographic / abstract visual system.

## Deployment

GitHub Pages использует ветку `gh-pages`, корень `/`.

Push в `main` запускает `.github/workflows/pages.yml`, который синхронизирует актуальный commit из `main` в `gh-pages`. После этого GitHub Pages автоматически публикует новую версию сайта.

## Status

- [x] research / strategy
- [x] concept copy
- [x] responsive implementation
- [x] motion + reduced-motion mode
- [x] accessibility baseline
- [x] editable commercial config
- [x] GitHub Actions workflow
- [x] GitHub Pages enabled
- [x] static production package
