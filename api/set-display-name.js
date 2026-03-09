// Verified display-name writer.
// Requires a wallet signature that proves ownership of `address`.
// Writes via the Supabase service-role key (bypasses client RLS).

import { createClient }               from '@supabase/supabase-js';
import { recoverAddress, hashMessage } from 'viem';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const { address, displayName, signature, message } = req.body ?? {};

  if (!address || !displayName || !signature || !message) {
    return res.status(400).send('Missing required fields');
  }

  // Verify that the signature was produced by `address`
  let recovered;
  try {
    recovered = await recoverAddress({ hash: hashMessage(message), signature });
  } catch {
    return res.status(400).send('Invalid signature format');
  }

  if (recovered.toLowerCase() !== address.toLowerCase()) {
    return res.status(403).send('Signature does not match address');
  }

  // Reject signatures older than 5 minutes to prevent replay attacks
  const tsMatch = message.match(/Timestamp:\s*(\d+)/);
  if (!tsMatch || Date.now() - Number(tsMatch[1]) > 5 * 60 * 1000) {
    return res.status(401).send('Signature expired — please sign in again');
  }

  const trimmed = displayName.slice(0, 30); // enforce server-side max length
  const { error } = await supabase
    .from('profiles')
    .upsert({ wallet_address: address.toLowerCase(), display_name: trimmed });

  if (error) return res.status(500).send(error.message);

  return res.status(200).json({ ok: true });
}
