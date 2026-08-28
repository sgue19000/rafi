# Deployment

Termline is a Next.js 14 app. Core features run in the browser without DATABASE_URL.

## Public URLs

- Production alias: https://termline-sgue19000.vercel.app/
- Deployment URL: https://termline-ny7e93drv-sgue19000.vercel.app/

Deployment Protection / Vercel Authentication must stay **off** for Production or visitors hit an SSO wall.

## Vercel

- Framework: Next.js
- Root: /
- Production branch: main
- Node: 20
- Required env: none
- Optional env: DATABASE_URL, AUTH_SECRET, APP_URL, SMTP_*

Git push to main triggers production when the GitHub integration is linked.

## Local

```bash
npm install
npm test
npx tsc --noEmit
npm run build
npm start
```

## Database absence

GET /api/health returns `{ ok: true, product: "termline", mode: "local" }` without DATABASE_URL.
GET /api/terms returns 501 with a JSON error. The UI uses localStorage and does not depend on that route.
