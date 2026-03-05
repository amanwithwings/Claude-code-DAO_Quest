// ─────────────────────────────────────────────────────────────────────────────
// Quest content — edit this file each week to update the digest.
// Add a new entry to WEEKS for each new week. The most recent entry is shown
// by default. Quest IDs must be unique across all weeks.
// ─────────────────────────────────────────────────────────────────────────────

const SECTIONS_MAR_4_2026 = [
  // ── Active Votes ───────────────────────────────────────────────────────────
  {
    id:    'votes',
    label: '🗳️ Active Votes',
    quests: [
      {
        id:            'dvp-quorum',
        xp:            30,
        variant:       'main',
        icon:          '🗳️',
        iconBg:        'rgba(248,81,73,0.12)',
        category:      'On-Chain Vote',
        categoryColor: 'var(--red)',
        title:         'DVP Quorum & Proposal Cancellation Upgrade',
        badges:        [{ type: 'live', label: 'Live' }],
        description:
          'A bundled upgrade proposing two changes to ArbitrumDAO governance: ' +
          'improved quorum computation logic and the ability to cancel proposals ' +
          'during the 3-day pre-vote window. Voting is open through March 12th.',
        details: [
          'New quorum computation makes vote thresholds more predictable and fair',
          'Proposal cancellation window gives the DAO a safety valve against errors or bad actors',
          'Voting opened Thursday — closes March 12th. Your vote matters!',
        ],
        stats: [
          { type: 'vote-for',     label: 'For: 56.55m ARB' },
          { type: 'vote-against', label: 'Against: 336k ARB' },
          { type: 'vote-quorum',  label: 'Quorum needed: 218.85m ARB' },
        ],
        link: { href: 'https://www.tally.xyz/gov/arbitrum', label: '🗳️ Vote on Tally' },
      },
    ],
  },

  // ── Forum Discussions ──────────────────────────────────────────────────────
  {
    id:    'forum',
    label: '💬 Forum Discussions',
    quests: [
      {
        id:            'automate-funds',
        xp:            20,
        variant:       'main',
        icon:          '💰',
        iconBg:        'rgba(40,160,240,0.12)',
        category:      'Treasury Proposal',
        categoryColor: 'var(--arb-blue)',
        title:         'Automate Consolidation of Idle Funds into Treasury Portfolio',
        badges:        [{ type: 'new', label: 'Temperature Check Soon' }],
        description:
          'Entropy Advisors proposes an operating directive that would automatically ' +
          'route surplus and idle non-ARB funds from DAO programs into the Arbitrum ' +
          'Treasury Management Committee (ATMC) — putting idle capital to work ' +
          'generating yield instead of sitting dormant.',
        details: [
          'Currently the DDA V2 Program and D.A.O. Grant Program hold significant idle funds',
          'Funds would move to AF-chosen wallets immediately when feasible',
          'Each new ATMC deployment using consolidated funds requires separate OAT approval',
          'Temperature check expected this week — engage on the forum now!',
        ],
        link: { href: 'https://forum.arbitrum.foundation', label: '💬 View Forum Discussion' },
      },
    ],
  },

  // ── Other Updates ──────────────────────────────────────────────────────────
  {
    id:    'other',
    label: '📰 Other Updates',
    quests: [
      {
        id:      'gov-call',
        xp:      10,
        variant: 'sub',
        icon:    '🎙️',
        title:   'Open Discussion of Proposals — Governance Call (Today!)',
        badges:  [{ type: 'live', label: 'Today' }],
        description:
          'The regular open governance call is happening today. A great chance to hear ' +
          'from delegates, ask questions, and engage with active proposals live.',
      },
      {
        id:      'firestarters',
        xp:      10,
        variant: 'sub',
        icon:    '🔥',
        title:   'Firestarters Grant: February Update',
        description:
          'The Firestarters grant program posted its February update. Check in on ' +
          "milestone progress, deliverables completed, and what's coming next.",
      },
      {
        id:      'rad-update',
        xp:      10,
        variant: 'sub',
        icon:    '🏅',
        title:   'Rewarding Active Delegates (RAD): February Update',
        description:
          'The RAD program tracks and rewards delegates for active governance participation. ' +
          "February's update covers who met their thresholds and what rewards are distributed.",
      },
      {
        id:      'timeboost',
        xp:      10,
        variant: 'sub',
        icon:    '⚡',
        title:   'Timeboost Reserve Price Reverted to 0.001 ETH',
        description:
          'Offchain Labs is reverting the Timeboost reserve price from 0.0075 ETH back to ' +
          '0.001 ETH, reversing a change made last week and restoring original sequencer ' +
          'priority pricing.',
      },
      {
        id:      'precompile',
        xp:      10,
        variant: 'sub',
        icon:    '🔧',
        title:   '[Grantee Report] Arbitrum Native Precompile & Tx-Type Support for Local Testing',
        description:
          'Maintenance update from the grantee working on Arbitrum-native precompile and ' +
          'transaction-type support for local testing environments, improving developer DX.',
      },
      {
        id:      'chaincraft',
        xp:      10,
        variant: 'sub',
        icon:    '🎮',
        title:   '[Grantee Report] ChainCraft: AI-Powered Game Creation',
        description:
          'ChainCraft is building an AI-powered game creation platform on Arbitrum, lowering ' +
          'the barrier for developers to ship on-chain games. Latest milestones inside.',
      },
    ],
  },
];

// ── Weeks registry ────────────────────────────────────────────────────────────
// Add a new object here each week. Most-recent entry = default on load.

export const WEEKS = [
  {
    id:         'week-2026-03-04',
    label:      'Week of Mar 4, 2026',
    shortLabel: 'Mar 4, 2026',
    sections:   SECTIONS_MAR_4_2026,
  },
  // {
  //   id:         'week-2026-03-11',
  //   label:      'Week of Mar 11, 2026',
  //   shortLabel: 'Mar 11, 2026',
  //   sections:   SECTIONS_MAR_11_2026,
  // },
];

export const DEFAULT_WEEK_ID = WEEKS[WEEKS.length - 1].id;

export function getWeekById(id) {
  return WEEKS.find((w) => w.id === id) ?? WEEKS[WEEKS.length - 1];
}
