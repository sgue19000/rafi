# Database schema (PostgreSQL)

Required only when DATABASE_URL is set.

```sql
create table households (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 80),
  base_currency char(3) not null default 'USD',
  locale text not null default 'en',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table users (
  id uuid primary key default gen_random_uuid(),
  email text unique,
  password_hash text,
  display_name text not null,
  created_at timestamptz not null default now()
);

create table memberships (
  household_id uuid not null references households(id) on delete cascade,
  user_id uuid not null references users(id) on delete cascade,
  role text not null check (role in ('owner','editor','viewer')),
  primary key (household_id, user_id)
);

create table terms (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references households(id) on delete cascade,
  name text not null check (char_length(name) between 1 and 80),
  vendor text not null default '',
  kind text not null check (kind in ('subscription','contract','document','warranty','membership','utility','other')),
  cadence text not null check (cadence in ('weekly','monthly','quarterly','yearly','once')),
  amount numeric(12,2) not null check (amount >= 0),
  currency char(3) not null,
  next_date date not null,
  notice_days integer not null check (notice_days between 0 and 365),
  auto_renew boolean not null default true,
  decision text not null check (decision in ('keep','review','switch','cancel','done')),
  owner_name text not null default '',
  notes text not null default '',
  cancel_url text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create index terms_household_next_date on terms (household_id, next_date) where deleted_at is null;
```
