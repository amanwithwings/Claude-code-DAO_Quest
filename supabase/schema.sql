-- ── Initial table (run once) ────────────────────────────────────────────────

create table if not exists quest_progress (
  wallet_address  text        not null,
  quest_id        text        not null,
  xp              integer     not null default 0,
  read_at         timestamptz not null default now(),
  primary key (wallet_address, quest_id)
);

alter table quest_progress enable row level security;

create policy "Allow all for now"
  on quest_progress for all
  using (true) with check (true);

-- ── Profiles (display names) ─────────────────────────────────────────────────

create table if not exists profiles (
  wallet_address  text        primary key,
  display_name    text        not null check (char_length(display_name) <= 30),
  updated_at      timestamptz not null default now()
);

alter table profiles enable row level security;

create policy "Allow all for now"
  on profiles for all
  using (true) with check (true);

-- ── Migration: add xp column if upgrading from v1 ────────────────────────────
-- (safe to run again — IF NOT EXISTS / ADD COLUMN IF NOT EXISTS)
alter table quest_progress add column if not exists xp integer not null default 0;

-- ── Migration: tighten RLS — run on production once Vercel API routes are live ──
-- Reads stay open (leaderboard needs all wallets).
-- Writes are now handled by api/{save-progress,set-display-name}.js
-- using the service-role key, which bypasses RLS entirely.
-- The anon key (used by the browser client) is denied all writes.
--
-- WARNING: After applying this, local dev writes via direct Supabase calls
-- will fail unless you run `vercel dev` (which starts the API function server).
-- Alternatively, keep a separate dev Supabase project with the permissive policy.

drop policy if exists "Allow all for now" on quest_progress;
drop policy if exists "Allow all for now" on profiles;

create policy "Public read — quest_progress"
  on quest_progress for select using (true);

create policy "Public read — profiles"
  on profiles for select using (true);

-- No INSERT / UPDATE / DELETE policy for the anon role.
-- Only the service-role key (used in Netlify functions) can write.
