// Serverless proxy for the Tally GraphQL API.
// Keeps TALLY_API_KEY on the server — never exposed to the client bundle.

const TALLY_URL = 'https://api.tally.xyz/query';

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const res = await fetch(TALLY_URL, {
      method:  'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(process.env.TALLY_API_KEY ? { 'Api-Key': process.env.TALLY_API_KEY } : {}),
      },
      body: event.body,
    });

    return {
      statusCode: res.status,
      headers: { 'Content-Type': 'application/json' },
      body: await res.text(),
    };
  } catch (err) {
    return { statusCode: 502, body: err.message };
  }
};
