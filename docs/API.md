# API

| Method | Route | Auth | Local |
|---|---|---|---|
| GET | /api/health | public | 200 |
| GET | /api/terms | session | 501 without DB |
| POST | /api/terms | editor+ | 501 without DB |

Error shape: `{ "error": "local_mode", "message": "..." }`

POST body: name, vendor, kind, cadence, amount, currency, nextDate, noticeDays, autoRenew.
401 no session. 403 viewer. 422 validation.
