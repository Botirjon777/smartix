# SmartIX — Showcase Website

The official showcase website for **SmartIX**, a software development company.
Built as a fast, interactive, fully responsive single-page site with multi-language
support (Uzbek, Russian, English).

> _Smart digital solutions for your business._

---

## ✨ Features

- **Multi-language (i18n)** — `uz` / `ru` / `en` with locale-prefixed routes
  (`/uz`, `/ru`, `/en`), automatic redirect based on cookie & `Accept-Language`,
  and a language switcher that preserves the current page. No external i18n library.
- **Fully responsive** — mobile-first layout, adaptive navbar with a slide-down mobile menu.
- **Interactive & animated** — scroll-reveal (IntersectionObserver), animated
  count-up stats, gradient blobs, hover effects, a tech marquee, and a code-window hero mockup.
- **Modern design** — dark theme, glassmorphism, gradient accents, custom scrollbar.
- **Accessible** — semantic HTML, `aria` labels, and `prefers-reduced-motion` support.
- **SEO-ready** — per-locale metadata, statically generated pages (SSG).

### Sections

| Section  | Description                                              |
| -------- | -------------------------------------------------------- |
| Hero     | Headline, animated stats, code mockup, tech marquee      |
| Services | 6 services (Web, Mobile, Backend/API, UI/UX, Cloud, Consulting) |
| Why us   | 4 key advantages                                         |
| Team     | Botirjon Shokirov, Ikboljon Abdurasulov, Davlatjon Akhmadjonov |
| Contact  | Call-to-action with email link                           |
| Footer   | Links, contact info, socials                             |

---

## 🛠 Tech Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- [React 19](https://react.dev)
- [Tailwind CSS v4](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)
- Custom lightweight i18n (dictionary-based, no runtime dependency)

---

## 🚀 Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to your
preferred locale automatically (e.g. `/uz`).

### Available scripts

```bash
npm run dev      # start dev server (Turbopack)
npm run build    # production build
npm run start    # run the production build
npm run lint     # run ESLint
```

---

## 📁 Project Structure

```
smartix/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx        # root layout: <html lang>, fonts, providers, navbar, footer
│   │   └── page.tsx          # home page (assembles all sections)
│   ├── globals.css           # theme tokens, animations, utilities
│   └── favicon.ico
├── components/
│   ├── sections/             # Hero, Services, Why, Team, CTA, Footer
│   ├── Navbar.tsx
│   ├── LanguageSwitcher.tsx
│   ├── Background.tsx        # animated gradient/grid background
│   ├── Reveal.tsx            # scroll-reveal wrapper
│   ├── CountUp.tsx           # animated number counter
│   ├── SectionHeading.tsx
│   ├── Logo.tsx
│   └── icons.tsx             # inline SVG icon set
├── i18n/
│   ├── config.ts             # locales, default locale, helpers
│   ├── dictionaries/         # uz.ts (source of truth), ru.ts, en.ts
│   ├── getDictionary.ts
│   └── I18nProvider.tsx      # client context for translations
├── proxy.ts                  # locale detection & redirect (Next 16 proxy convention)
└── ...
```

---

## 🌐 Adding or Editing Translations

All copy lives in [`i18n/dictionaries/`](i18n/dictionaries/). `uz.ts` is the
source of truth and defines the `Dictionary` type — `ru.ts` and `en.ts` must
match its shape (enforced by TypeScript).

To add a new language:

1. Add the code to `locales` in [`i18n/config.ts`](i18n/config.ts) and add its
   name/flag to `localeNames` / `localeFlags`.
2. Create `i18n/dictionaries/<code>.ts` implementing the `Dictionary` type.
3. Register it in [`i18n/getDictionary.ts`](i18n/getDictionary.ts).

---

## 📦 Deployment

The site is statically generated and deploys anywhere Next.js is supported.
The easiest option is [Vercel](https://vercel.com/new):

```bash
npm run build
```

---

## 👥 Team

- **Botirjon Shokirov** — Software Engineer
- **Ikboljon Abdurasulov** — Backend Developer
- **Davlatjon Akhmadjonov** — Product Manager

---

## 📄 License

Licensed under the [MIT License](LICENSE) © 2026 SmartIX.
