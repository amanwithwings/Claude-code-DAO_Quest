import { createClient } from '@supabase/supabase-js';

const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL  ?? '';
const supabaseAnon = import.meta.env.VITE_SUPABASE_ANON_KEY ?? '';

// Returns a real client when env vars are set; otherwise a no-op stub so the
// app still works locally without Supabase configured.
function makeClient() {
  if (supabaseUrl && supabaseAnon) {
    return createClient(supabaseUrl, supabaseAnon);
  }
  // Stub: all calls resolve immediately with empty data
  const noop = async () => ({ data: [], error: null });
  return { from: () => ({ select: noop, upsert: noop, eq: () => ({ select: noop }) }) };
}

export const supabase = makeClient();

// ── helpers ──────────────────────────────────────────────────────────────────

export async function loadProgress(address) {
  const { data, error } = await supabase
    .from('quest_progress')
    .select('quest_id')
    .eq('wallet_address', address.toLowerCase());

  if (error) {
    console.error('Supabase load error:', error);
    return [];
  }
  return (data ?? []).map((r) => r.quest_id);
}

export async function saveProgress(address, questId) {
  const { error } = await supabase.from('quest_progress').upsert(
    { wallet_address: address.toLowerCase(), quest_id: questId },
    { onConflict: 'wallet_address,quest_id' }
  );
  if (error) console.error('Supabase save error:', error);
}
