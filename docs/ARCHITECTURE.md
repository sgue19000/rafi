# Architecture

Modular monolith. No microservices.

```
Browser (mobile-first UI)
  -> React client store (localStorage)
  -> Next.js App Router
  -> API routes (501 in local mode)
  -> PostgreSQL (optional)
```

State: one StoreProvider. Validation is repeated in forms and in the SQL checks in DATABASE.md. Client checks are not trusted once Postgres is live.

Authorization rule: every term query filters household_id from session membership. Never accept household IDs from the client alone.
