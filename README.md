# 1845 — коммерческое предложение

Интерактивное коммерческое предложение для **1845 Lounge Bar, Новосибирск**. Это не официальный сайт заведения, а презентация возможного следующего digital-этапа бренда.

## Design concept — 18:45

**18:45 — момент переключения из рабочего дня в свой вечер.** Концепция использует timestamps, minute marks, типографику времени и постепенный переход от более холодного дневного состояния к тёплому вечернему.

Визуальный язык: тёплый графит, off-white, приглушённый amber и глубокий wine. Без black + gold luxury, клубного неона и случайных stock-фотографий.

## Production

https://mishkastrategy.github.io/1845/

## Stack

- semantic HTML5
- modern CSS
- vanilla JavaScript
- GitHub Actions + GitHub Pages

Стек намеренно лёгкий: статическое коммерческое предложение не требует runtime-фреймворка, получает минимальный JS и корректно работает из подпапки `/1845/`.

## Запуск локально

```bash
python3 -m http.server 4173
```

Открыть `http://localhost:4173`.

## Структура

```text
.
├── index.html
├── styles.css
├── script.js
├── assets/
│   ├── favicon.svg
│   └── og.svg
├── src/
│   └── content/
│       └── offer.js
└── .github/
    └── workflows/
        └── pages.yml
```

## Коммерческие условия

Цена, срок, скидка, схема оплаты и состав пакета сведены в:

`src/content/offer.js`

До утверждения scope интерфейс показывает человеческую формулировку без технических placeholders.

## Что реализовано

- research dashboard 1845;
- сильные стороны продукта и voice of customer;
- аудит текущего digital-разрыва;
- сценарии первого визита, компании, дня рождения и постоянного гостя;
- ключевой экран `18:45 — switch to evening`;
- prototype-like screens будущего сайта;
- предлагаемая архитектура официального сайта;
- animated customer flow;
- mobile-first concept;
- короткий booking prototype;
- local digital ecosystem;
- scope + optional modules;
- before / after outcomes без fake growth metrics;
- 7-недельный roadmap;
- editable offer;
- финальный CTA с возвратом к 18:45;
- responsive rules от 320 px;
- `prefers-reduced-motion`, focus states и touch-friendly controls.

## Источники исследования

Материалы использовались только как фактическая база и объект аудита; существующий дизайн не копировался.

- 2ГИС — 1845 Lounge Bar, Большевистская 132;
- 2ГИС — 1845 магазин по тому же адресу;
- Яндекс Карты — отзывы и карточка;
- текущий сайт — https://deusvox.ru/loungebar1845;
- публичные ссылки 1845 из карточек бизнеса (Telegram / social);
- локальные конкурентные ориентиры: Мята Lounge, HookahPlace, Bad Habits;
- hospitality references: Soho House, Scarfes Bar, The Standard.

Production не hotlink-ит изображения из 2ГИС и не использует случайные stock-фотографии. Визуальная система построена на типографике, CSS-графике и собственных интерфейсных mockups.

## Deployment

Workflow `.github/workflows/pages.yml`:

1. checkout;
2. configure GitHub Pages;
3. upload static artifact;
4. deploy to Pages.

Все локальные assets используют относительные пути, поэтому deployment корректен под `/1845/`.

## Status

**Production-ready proposal.** Финальные коммерческие цифры и конкретный контакт для CTA меняются после согласования с заказчиком.