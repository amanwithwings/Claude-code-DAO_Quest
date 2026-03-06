// ─────────────────────────────────────────────────────────────────────────────
// Live vote fetching — Tally (onchain) + Snapshot (off-chain temp checks)
//
// Quest data shape expected:
//   proposal: {
//     source:     'tally' | 'snapshot',
//     id:         '<proposalId>',
//     governorId: 'eip155:42161:0x...',   // Tally only
//   }
//
// Normalised return value:
//   { forARB, againstARB, abstainARB, quorumARB, status, endTime }
// ─────────────────────────────────────────────────────────────────────────────

// /api/tally is proxied through the server (Vite proxy in dev, Netlify function
// in prod) so the API key is never exposed in the client bundle.
const TALLY_ENDPOINT    = '/api/tally';
const SNAPSHOT_ENDPOINT = 'https://hub.snapshot.org/graphql';

// ARB has 18 decimals. Tally returns weights as integer strings (wei).
// Avoid BigInt precision loss by doing string math.
function weiToARB(weiStr) {
  const s = String(weiStr ?? '0').split('.')[0]; // integer part only
  if (s === '0' || s === '') return 0;
  if (s.length <= 18) return Number(s) / 1e18;
  const whole = s.slice(0, s.length - 18) || '0';
  const frac  = s.slice(s.length - 18, s.length - 12).padEnd(6, '0');
  return parseFloat(`${whole}.${frac}`);
}

// ── Tally (onchain governance) ────────────────────────────────────────────────
// Confirmed schema via introspection 2026-03-06:
//   - ProposalInput uses onchainId + governorId (not a combined id string)
//   - VoteStats field is votesCount (Uint256 string), not weight
//   - voteStats.type is lowercase: 'for' / 'against' / 'abstain'
//   - end is BlockOrTimestamp union — needs inline fragments
const TALLY_QUERY = `
  query LiveProposal($input: ProposalInput!) {
    proposal(input: $input) {
      id
      status
      quorum
      voteStats {
        type
        votesCount
        votersCount
        percent
      }
      end {
        ... on Block            { timestamp }
        ... on BlocklessTimestamp { timestamp }
      }
    }
  }
`;

async function fetchTally(onchainId, governorId) {
  const res = await fetch(TALLY_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // No API key here — injected server-side by the proxy
    },
    body: JSON.stringify({
      query: TALLY_QUERY,
      variables: { input: { onchainId, governorId } },
    }),
  });

  if (!res.ok) throw new Error(`Tally HTTP ${res.status}`);
  const json = await res.json();

  if (json.errors) {
    console.warn('Tally API errors:', json.errors);
    return null;
  }

  const p = json.data?.proposal;
  if (!p) return null;

  // type values are lowercase: 'for', 'against', 'abstain', 'pendingfor', …
  const forStat     = p.voteStats?.find((s) => s.type === 'for');
  const againstStat = p.voteStats?.find((s) => s.type === 'against');
  const abstainStat = p.voteStats?.find((s) => s.type === 'abstain');

  // end.timestamp is an ISO 8601 string (e.g. "2026-03-12T22:47:59Z")
  const endTimestamp = p.end?.timestamp;

  return {
    forARB:     weiToARB(forStat?.votesCount),
    againstARB: weiToARB(againstStat?.votesCount),
    abstainARB: weiToARB(abstainStat?.votesCount),
    quorumARB:  weiToARB(p.quorum),
    status:     (p.status ?? 'active').toLowerCase(),
    endTime:    endTimestamp ? new Date(endTimestamp) : null,
    source:     'tally',
  };
}

// ── Snapshot (off-chain temp checks) ─────────────────────────────────────────
const SNAPSHOT_QUERY = `
  query LiveProposal($id: String!) {
    proposal(id: $id) {
      state
      choices
      scores
      quorum
      end
    }
  }
`;

async function fetchSnapshot(proposalId) {
  const res = await fetch(SNAPSHOT_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: SNAPSHOT_QUERY,
      variables: { id: proposalId },
    }),
  });

  if (!res.ok) throw new Error(`Snapshot HTTP ${res.status}`);
  const json = await res.json();

  if (json.errors) {
    console.warn('Snapshot API errors:', json.errors);
    return null;
  }

  const p = json.data?.proposal;
  if (!p) return null;

  // choices / scores are parallel arrays; find For & Against by name
  const forIdx     = p.choices.findIndex((c) => /^for$/i.test(c.trim()));
  const againstIdx = p.choices.findIndex((c) => /^against$/i.test(c.trim()));
  const abstainIdx = p.choices.findIndex((c) => /^abstain$/i.test(c.trim()));

  // Snapshot scores are already in token units (not wei)
  return {
    forARB:     forIdx     >= 0 ? p.scores[forIdx]     : 0,
    againstARB: againstIdx >= 0 ? p.scores[againstIdx] : 0,
    abstainARB: abstainIdx >= 0 ? p.scores[abstainIdx] : 0,
    quorumARB:  p.quorum ?? 0,
    status:     p.state ?? 'closed',
    endTime:    p.end ? new Date(p.end * 1000) : null,
    source:     'snapshot',
  };
}

// ── Public entry-point ────────────────────────────────────────────────────────
export async function fetchLiveVotes(proposal) {
  if (!proposal) return null;
  try {
    if (proposal.source === 'tally') {
      return await fetchTally(proposal.id, proposal.governorId);
    }
    if (proposal.source === 'snapshot') {
      return await fetchSnapshot(proposal.id);
    }
  } catch (err) {
    console.warn('[liveVotes] fetch failed, falling back to static data:', err.message);
  }
  return null;
}
