# Security

- No bank credentials collected.
- No secrets in the repo. .env is gitignored.
- XSS: React escaping, no dangerouslySetInnerHTML.
- Cancel URLs open with rel=noreferrer.
- CSRF: local mode has no cookie writes. Server mode must use SameSite=Lax sessions.
- IDOR: SQL must filter household_id from membership.
- Auth endpoints must be rate-limited when implemented.
- Remaining risk: localStorage is readable on the origin. Do not load untrusted third-party scripts.
