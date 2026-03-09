import { createClient } from '@supabase/supabase-js';

const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL  ?? '';
const supabaseAnon = import.meta.env.VITE_SUPABASE_ANON_KEY ?? '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnon);

function makeClient() {
  if (isSupabaseConfigured) return createClient(supabaseUrl, supabaseAnon);

  // Stub for local-only mode.
  // select() returns a Promise (so it's directly await-able) that also has
  // an .eq() method (so select().eq() chains work too).
  const emptyResult = { data: [], error: null };
  const makeSelectResult = () => {
    const p = Promise.resolve(emptyResult);
    p.eq = async () => emptyResult;
    return p;
  };
  return {
    from: () => ({
      select: () => makeSelectResult(),
      upsert: async () => emptyResult,
    }),
  };
}

const supabase = makeClient();

// ── Quest progress ────────────────────────────────────────────────────────────

// Returns [{quest_id, xp}] so callers can both restore progress and
// detect/backfill rows that were saved before the xp column existed.
export async function loadProgress(address) {
  if (!isSupabaseConfigured) return [];
  const { data, error } = await supabase
    .from('quest_progress')
    .select('quest_id, xp')
    .eq('wallet_address', address.toLowerCase());
  if (error) throw new Error(`Failed to load progress: ${error.message}`);
  return data ?? [];
}

// authProof = { signature, message } captured at wallet sign-in time.
// When present, writes go through the server-side verified endpoint so the
// Supabase service-role key (not the anon key) performs the write — the anon
// key is denied write access by RLS in production.
export async function saveProgress(address, questId, xp = 0, authProof = null) {
  if (!isSupabaseConfigured) return;

  if (authProof?.signature) {
    const res = await fetch('/api/save-progress', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ address, questId, xp, ...authProof }),
    });
    if (res.status === 401) {
      const err = new Error('Session expired');
      err.sessionExpired = true;
      throw err;
    }
    if (!res.ok) throw new Error(`Failed to save progress: ${res.statusText}`);
    return;
  }

  // Fallback: direct Supabase write.
  // Works in local dev (where the Vercel function server isn't running).
  // Blocked by RLS in production when RLS migration has been applied.
  const { error } = await supabase
    .from('quest_progress')
    .upsert({ wallet_address: address.toLowerCase(), quest_id: questId, xp });
  if (error) throw new Error(`Failed to save progress: ${error.message}`);
}

// ── Leaderboard ───────────────────────────────────────────────────────────────

export async function fetchLeaderboard() {
  if (!isSupabaseConfigured) return [];

  const [{ data: progress, error: pe }, { data: profiles }] = await Promise.all([
    supabase.from('quest_progress').select('wallet_address, xp'),
    supabase.from('profiles').select('wallet_address, display_name'),
  ]);
  if (pe) throw new Error(`Leaderboard error: ${pe.message}`);

  // Aggregate XP per wallet
  const agg = {};
  for (const { wallet_address, xp = 0 } of (progress ?? [])) {
    if (!agg[wallet_address]) agg[wallet_address] = { total_xp: 0, quests_read: 0 };
    agg[wallet_address].total_xp    += xp;
    agg[wallet_address].quests_read += 1;
  }

  const nameMap = Object.fromEntries(
    (profiles ?? []).map((p) => [p.wallet_address, p.display_name])
  );

  return Object.entries(agg)
    .map(([addr, stats]) => ({ wallet_address: addr, display_name: nameMap[addr] ?? null, ...stats }))
    .sort((a, b) => b.total_xp - a.total_xp)
    .slice(0, 20);
}

// ── Profiles / display names ──────────────────────────────────────────────────

export async function setDisplayName(address, displayName, authProof = null) {
  if (!isSupabaseConfigured) return;

  if (authProof?.signature) {
    const res = await fetch('/api/set-display-name', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ address, displayName, ...authProof }),
    });
    if (!res.ok) throw new Error(`Failed to save display name: ${res.statusText}`);
    return;
  }

  // Fallback: direct Supabase write (dev only — blocked by RLS in production).
  const { error } = await supabase
    .from('profiles')
    .upsert({ wallet_address: address.toLowerCase(), display_name: displayName });
  if (error) throw new Error(`Failed to save display name: ${error.message}`);
}
