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

const TALLY_ENDPOINT    = 'https://api.tally.xyz/query';
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
const TALLY_QUERY = `
  query LiveProposal($input: ProposalInput!) {
    proposal(input: $input) {
      id
      status
      quorum
      voteStats {
        type
        weight
        votersCount
      }
      end { timestamp }
    }
  }
`;

async function fetchTally(proposalId, governorId) {
  const key = import.meta.env.VITE_TALLY_API_KEY;
  if (!key) { console.warn('VITE_TALLY_API_KEY not set'); return null; }

  // Tally full proposal ID format: eip155:{chainId}:{governorAddr}:{proposalId}
  const fullId = governorId
    ? `${governorId}:${proposalId}`
    : proposalId;

  const res = await fetch(TALLY_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Api-Key': key,
    },
    body: JSON.stringify({
      query: TALLY_QUERY,
      variables: { input: { id: fullId } },
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

  const forStat     = p.voteStats?.find((s) => s.type === 'FOR');
  const againstStat = p.voteStats?.find((s) => s.type === 'AGAINST');
  const abstainStat = p.voteStats?.find((s) => s.type === 'ABSTAIN');

  return {
    forARB:     weiToARB(forStat?.weight),
    againstARB: weiToARB(againstStat?.weight),
    abstainARB: weiToARB(abstainStat?.weight),
    quorumARB:  weiToARB(p.quorum),
    status:     (p.status ?? 'active').toLowerCase(),
    endTime:    p.end?.timestamp ? new Date(Number(p.end.timestamp) * 1000) : null,
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
