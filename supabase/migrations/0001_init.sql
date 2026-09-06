create table if not exists markets (
  id uuid primary key default gen_random_uuid(),
  polymarket_id text not null unique,
  question text not null,
  category text,
  yes_price numeric not null default 0.5,
  no_price numeric not null default 0.5,
  volume numeric not null default 0,
  liquidity numeric not null default 0,
  closes_at timestamptz,
  pulse_score numeric not null default 0,
  updated_at timestamptz not null default now()
);

create index if not exists markets_pulse_score_idx on markets (pulse_score desc);
