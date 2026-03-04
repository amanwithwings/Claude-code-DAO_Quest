-- Run this in the Supabase SQL editor for your project.

create table if not exists quest_progress (
  wallet_address  text        not null,
  quest_id        text        not null,
  read_at         timestamptz not null default now(),
  primary key (wallet_address, quest_id)
);

-- Row-level security (enable but keep permissive for v1 — lock down in v2
-- once you add JWT-based wallet auth via SIWE or Supabase Auth).
alter table quest_progress enable row level security;

create policy "Allow all for now"
  on quest_progress
  for all
  using (true)
  with check (true);
