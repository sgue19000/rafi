# Termline

Privacy-first web app for subscriptions, contracts, warranties, and document expiries.

Bank-linked trackers need US rails and your accounts. iOS list apps do not cover leases or passports and cannot be shared. Termline is a household decision board: notice window, review queue, keep/review/switch/cancel. No bank. No AI core.

Repo: https://github.com/sgue19000/rafi

## Run

```bash
npm install
npm test
npm run dev
```

http://localhost:3000 — Settings → Load demo household.

```bash
npm run build && npm start
```

## Stack

Next.js 14, React 18, TypeScript, Tailwind. Browser store by default. Postgres schema in docs/DATABASE.md when DATABASE_URL exists.

## Docs

- docs/PRODUCT.md — research, scoring, PRD, audit
- docs/ARCHITECTURE.md
- docs/DATABASE.md
- docs/API.md
- docs/SECURITY.md

## Deploy

Node host (Vercel, Render, Fly, Railway). Not GitHub Pages. CI runs tests, tsc, and production build on push.
