// Verified display-name writer.
// Requires a wallet signature that proves ownership of `address`.
// Writes via the Supabase service-role key (bypasses client RLS).

import { createClient }              from '@supabase/supabase-js';
import { recoverAddress, hashMessage } from 'viem';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let body;
  try { body = JSON.parse(event.body); }
  catch { return { statusCode: 400, body: 'Invalid JSON' }; }

  const { address, displayName, signature, message } = body ?? {};

  if (!address || !displayName || !signature || !message) {
    return { statusCode: 400, body: 'Missing required fields' };
  }

  // Verify that the signature was produced by `address`
  let recovered;
  try {
    recovered = recoverAddress({ hash: hashMessage(message), signature });
  } catch {
    return { statusCode: 400, body: 'Invalid signature format' };
  }

  if (recovered.toLowerCase() !== address.toLowerCase()) {
    return { statusCode: 403, body: 'Signature does not match address' };
  }

  const trimmed = displayName.slice(0, 30); // enforce server-side max length
  const { error } = await supabase
    .from('profiles')
    .upsert({ wallet_address: address.toLowerCase(), display_name: trimmed });

  if (error) return { statusCode: 500, body: error.message };

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ok: true }),
  };
};
