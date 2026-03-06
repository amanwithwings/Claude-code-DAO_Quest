// Serverless proxy for the Tally GraphQL API.
// Keeps TALLY_API_KEY on the server — never exposed to the client bundle.

const TALLY_URL = 'https://api.tally.xyz/query';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  try {
    const upstream = await fetch(TALLY_URL, {
      method:  'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(process.env.TALLY_API_KEY ? { 'Api-Key': process.env.TALLY_API_KEY } : {}),
      },
      // req.body is auto-parsed by Vercel — re-stringify for the upstream call
      body: JSON.stringify(req.body),
    });

    const data = await upstream.json();
    return res.status(upstream.status).json(data);
  } catch (err) {
    return res.status(502).send(err.message);
  }
}
