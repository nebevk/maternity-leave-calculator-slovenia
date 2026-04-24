# Project context for Claude

## Stack
- Vue 3 SPA, scaffolded with Vue CLI 5 (webpack). Not Nuxt.
- UI library: **PrimeVue 4** with the **Aura** preset. No Tailwind, no daisyUI.
- i18n via `vue-i18n` v9 (`legacy: false`, `globalInjection: true`). Locale persists in `localStorage` under `mlc.locale`.
- Routing via `vue-router` (manual config in `src/router/index.js`).

## When designing or modifying UI
Always reference the official PrimeVue LLM context for component APIs, props, slots, and design conventions:
**https://primevue.org/llms/llms.txt**

Fetch it with WebFetch when working on any UI component change so the latest v4 API is used (component names, prop signatures, and PassThrough patterns have changed across versions).

## Dark mode
Disabled. `darkModeSelector: false` in `src/main.js` — do not re-enable without an explicit toggle UI and a request from the user.

## Run
- `npm run serve` — dev server (http://localhost:8080)
- `npm run build` — production build
- `npm run lint` — ESLint
