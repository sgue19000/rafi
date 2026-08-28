# Deployment

Termline is a Next.js 14 app. Core features run in the browser without DATABASE_URL.

## Vercel

- Framework: Next.js
- Root: /
- Production branch: main
- Node: 20
- Required env: none
- Optional env: DATABASE_URL, AUTH_SECRET, APP_URL, SMTP_*

Git push to main triggers production. Other branches get preview deployments when the Git integration is linked.

## Local

```bash
npm install
npm test
npx tsc --noEmit
npm run build
npm start
```

## Database absence

/api/health returns `{ ok: true, mode: "local" }` without DATABASE_URL.
/api/terms returns 501 with a JSON error. The UI uses localStorage and does not depend on that route.
