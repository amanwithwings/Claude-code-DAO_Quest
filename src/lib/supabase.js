import { createClient } from '@supabase/supabase-js';

const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL  ?? '';
const supabaseAnon = import.meta.env.VITE_SUPABASE_ANON_KEY ?? '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnon);

// When env vars are missing we return a properly-chainable stub so the app
// still runs in local-only mode without throwing TypeErrors.
function makeClient() {
  if (isSupabaseConfigured) {
    return createClient(supabaseUrl, supabaseAnon);
  }
  // Stub that mirrors the exact chains used by this app:
  //   from().select().eq()   → { data: [], error: null }
  //   from().upsert()        → { data: [], error: null }
  return {
    from: () => ({
      select: () => ({
        eq: async () => ({ data: [], error: null }),
      }),
      upsert: async () => ({ data: [], error: null }),
    }),
  };
}

const supabase = makeClient();

// ── helpers ──────────────────────────────────────────────────────────────────

export async function loadProgress(address) {
  if (!isSupabaseConfigured) return [];

  const { data, error } = await supabase
    .from('quest_progress')
    .select('quest_id')
    .eq('wallet_address', address.toLowerCase());

  if (error) throw new Error(`Failed to load progress: ${error.message}`);
  return (data ?? []).map((r) => r.quest_id);
}

export async function saveProgress(address, questId) {
  if (!isSupabaseConfigured) return;

  // No onConflict needed — Supabase infers it from the primary key.
  const { error } = await supabase
    .from('quest_progress')
    .upsert({ wallet_address: address.toLowerCase(), quest_id: questId });

  if (error) throw new Error(`Failed to save progress: ${error.message}`);
}
