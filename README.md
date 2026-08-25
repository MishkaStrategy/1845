# 1845 — commercial proposal / 18:45

Интерактивное коммерческое предложение для **1845 Lounge Bar, Новосибирск, Большевистская 132 / Европейский Берег**.

## Production

https://mishkastrategy.github.io/1845/

## Design concept — 18:45

**18:45 — момент переключения из рабочего дня в свой вечер.** Визуальная система строится на времени, minute marks, тёплом переходе «день → вечер», editorial-типографике и мягком cinematic motion. Это B2B-презентация будущего digital-образа 1845, а не официальный гостевой сайт.

Hero визуально проходит последовательность `18:31 → 18:42 → 18:44 → 18:45`, после чего интерфейс «теплеет». Для `prefers-reduced-motion` используется статичное вечернее состояние.

## Proposal architecture

Четыре направления собраны в одну систему, а не представлены как случайный набор услуг:

1. **Website** — первый контакт, атмосфера, пространство, сценарии и прямое действие.
2. **Telegram Bot + Mini App** — бронь, диалог, актуальные поводы и повторный контакт.
3. **Mobile app** — следующий слой для постоянного гостя, только после подтверждения реальной механики удержания.
4. **Network layer** — безопасная инфраструктурная база для команды и digital-сервисов после технического аудита и с учётом применимого законодательства.

## Research snapshot

Публичные данные перепроверены **25.08.2026**. На момент среза карточка 2ГИС показывала рейтинг **5,0**, **182 оценки**, **128 отзывов** и **64 фото**. Источники исследования указаны внизу опубликованного предложения.

В production не hotlink-ятся фотографии картографических сервисов и не используются случайные stock-интерьеры вместо 1845.

## Stack

- semantic HTML5 fragments
- modular CSS custom properties + responsive layout
- vanilla JavaScript
- IntersectionObserver / progressive motion
- zero third-party runtime dependencies
- GitHub Actions + GitHub Pages

## Production build

Исходники остаются модульными в `fragments/`, но production **не зависит от JavaScript для загрузки основного контента**. `build.mjs` заранее собирает HTML-фрагменты в `dist/index.html`, после чего workflow публикует только `dist/` в `gh-pages`.

Это даёт:

- полноценный HTML на первом ответе;
- меньше сетевых запросов;
- устойчивый SEO/crawler fallback;
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
│   ├── responsive.css
│   └── ecosystem.css
├── src/content/offer.js
├── build.mjs
├── package.json
├── index.html
├── boot.js
└── script.js
```

`boot.js` остаётся development-loader для исходной оболочки. В production он не используется.

## Commercial config

Все изменяемые коммерческие условия собраны в `src/content/offer.js`. Неподтверждённые цены и фиксированный срок не используются: стоимость, календарный план и оплата фиксируются после утверждения первого релиза, интеграций и инфраструктурных работ.

## Audit status

Production сохраняет уже внедрённые улучшения:

- static-first rendering;
- social preview PNG 1200×630;
- semantic accordion controls;
- motion pause control for Voice of Customer;
- focus states and skip-link;
- mobile sticky CTA;
- reduced-motion support;
- clean `dist` deployment to `gh-pages`.

Текущий проход дополнительно закрывает:

- четыре обязательных направления предложения;
- последовательный customer journey Website → Telegram → App;
- отдельный Network Layer;
- отказ от неподтверждённого фиксированного срока;
- актуализацию research snapshot;
- responsive UI для новых ecosystem-секций.
