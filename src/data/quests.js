// ─────────────────────────────────────────────────────────────────────────────
// Quest content — edit this file each week to update the digest.
// Add a new entry to WEEKS for each new week. The most recent entry is shown
// by default. Quest IDs must be unique across all weeks.
// ─────────────────────────────────────────────────────────────────────────────


// ── Week of Mar 4, 2026 ───────────────────────────────────────────────────────
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
          'A bundled constitutional proposal introducing two governance upgrades: ' +
          '(1) changes to ArbitrumDAO\'s quorum computation logic, and ' +
          '(2) the ability for a proposer to cancel their proposal during the 3-day pending period. ' +
          'Voting is open through March 12th.',
        details: [
          'DVP Quorum: changes how quorum is computed — based on delegated votable tokens rather than total supply',
          'Proposal cancellation: proposers can withdraw a proposal before the vote begins',
          'Voting opened Thursday — closes March 12th',
        ],
        stats: [
          { type: 'vote-for',     label: 'For: 56.55m ARB' },
          { type: 'vote-against', label: 'Against: 336k ARB' },
          { type: 'vote-quorum',  label: 'Quorum needed: 218.85m ARB' },
        ],
        proposal: {
          source:     'tally',
          id:         '112177996398925212273579485756315626637025938627124330171390356044681347897430',
          governorId: 'eip155:42161:0xf07DeD9dC292157749B6Fd268E37DF6EA38395B9',
        },
        link: {
          href:  'https://www.tally.xyz/gov/arbitrum/proposal/112177996398925212273579485756315626637025938627124330171390356044681347897430?govId=eip155:42161:0xf07DeD9dC292157749B6Fd268E37DF6EA38395B9',
          label: '🗳️ View on Tally',
        },
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
          'route surplus and idle non-ARB capital from DAO programs into the Arbitrum ' +
          'Treasury Management Committee (ATMC), rather than returning it to the treasury ' +
          'and requiring separate offchain and onchain votes before redeployment.',
        details: [
          'Applies to unspent grant allocations, program surpluses, fee kickbacks, revenue share, and accrued AEP fees',
          'ARB tokens are explicitly excluded — applies to other capital only',
          'Each ATMC deployment of consolidated funds still requires separate OAT approval',
          'DAO retains clawback rights via Snapshot vote at any time',
          'Temperature check expected this week',
        ],
        link: {
          href:  'https://forum.arbitrum.foundation/t/automate-the-consolidation-of-idle-funds-into-the-treasury-management-portfolio/30579',
          label: '💬 View Forum Discussion',
        },
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
        title:   'Open Discussion of Proposals — Governance Call',
        badges:  [{ type: 'live', label: 'Today' }],
        description:
          'The regular open governance call is happening today. Delegates discuss active proposals and open items live.',
        link: {
          href:  'https://forum.arbitrum.foundation/t/march-3-2026-open-discussion-of-proposals-governance-call/30591',
          label: '🎙️ View Forum Thread',
        },
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
        link: {
          href:  'https://forum.arbitrum.foundation/t/firestarters-february-monthly-update/30586',
          label: '📄 Read Update',
        },
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
        link: {
          href:  'https://forum.arbitrum.foundation/t/rewarding-active-delegates-february-2025-results/30587',
          label: '📄 Read Update',
        },
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
        link: {
          href:  'https://forum.arbitrum.foundation/t/announcement-reserve-price-change/30580',
          label: '📄 Read Announcement',
        },
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
        link: {
          href:  'https://forum.arbitrum.foundation/t/final-report-arbitrum-native-precompile-tx-type-support-for-local-testing/30461/2?u=amanwithwings',
          label: '📄 Read Report',
        },
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
        link: {
          href:  'https://forum.arbitrum.foundation/t/final-report-chaincraft-ai-powered-game-creation/30581',
          label: '📄 Read Report',
        },
      },
    ],
  },
];

// ── Week of Mar 10, 2026 ──────────────────────────────────────────────────────
const SECTIONS_MAR_10_2026 = [
  // ── Active Votes ───────────────────────────────────────────────────────────
  {
    id:    'votes',
    label: '🗳️ Active Votes',
    quests: [
      {
        id:            'dvp-quorum-mar10',
        xp:            30,
        variant:       'main',
        icon:          '⏳',
        iconBg:        'rgba(248,81,73,0.12)',
        category:      'On-Chain Vote',
        categoryColor: 'var(--red)',
        title:         'DVP Quorum & Proposal Cancellation — Vote Closes Thursday',
        badges:        [{ type: 'live', label: 'Closes Mar 12' }],
        description:
          'The onchain constitutional vote for DVP Quorum & Proposal Cancellation is in its ' +
          'final days. Support is near-unanimous but the vote is currently below the 218.85m ARB ' +
          'constitutional quorum threshold. The window closes March 12th at 22:47 UTC.',
        details: [
          'Current support: ~99.8% For by ARB weight',
          'Currently below the 218.85m ARB constitutional quorum threshold',
          'Vote closes Thursday March 12th at 22:47 UTC',
          'If passed: quorum computation logic and proposal cancellation rules both update',
        ],
        stats: [
          { type: 'vote-for',     label: 'For: 56.55m ARB' },
          { type: 'vote-against', label: 'Against: 336k ARB' },
          { type: 'vote-quorum',  label: 'Quorum needed: 218.85m ARB' },
        ],
        proposal: {
          source:     'tally',
          id:         '112177996398925212273579485756315626637025938627124330171390356044681347897430',
          governorId: 'eip155:42161:0xf07DeD9dC292157749B6Fd268E37DF6EA38395B9',
        },
        link: {
          href:  'https://www.tally.xyz/gov/arbitrum/proposal/112177996398925212273579485756315626637025938627124330171390356044681347897430?govId=eip155:42161:0xf07DeD9dC292157749B6Fd268E37DF6EA38395B9',
          label: '🗳️ View on Tally',
        },
      },
      {
        id:            'automate-funds-tempcheck',
        xp:            25,
        variant:       'main',
        icon:          '🏦',
        iconBg:        'rgba(40,160,240,0.12)',
        category:      'Temperature Check',
        categoryColor: 'var(--arb-blue)',
        title:         'Temp Check: Automate Consolidation of Idle Funds into Treasury Portfolio',
        badges:        [{ type: 'live', label: 'Active' }],
        description:
          'Entropy Advisors\' proposal to establish an operating directive that would automatically ' +
          'route surplus and idle non-ARB capital from DAO programs into the Arbitrum Treasury ' +
          'Management Committee (ATMC) is now live for a Snapshot temperature check. Under the ' +
          'current process, idle funds must be returned to the treasury and then cleared through ' +
          'separate offchain and onchain votes before redeployment; this proposal would remove that step.',
        details: [
          'Covers unspent grant allocations, program surpluses, fee kickbacks, revenue share, and accrued AEP fees',
          'ARB tokens are explicitly excluded — this applies to other capital only',
          'Each ATMC deployment of consolidated funds still requires separate OAT approval',
          'DAO retains full clawback rights via a Snapshot vote at any time',
          'Quorum: non-constitutional threshold (pre-DVP) applies to this vote',
        ],
        proposal: {
          source: 'snapshot',
          id:     '0x703ef86b79590b07f770dd2369666085e112e2a8998a7e2f8011ed755611968c',
        },
        link: {
          href:  'https://snapshot.box/#/s:arbitrumfoundation.eth/proposal/0x703ef86b79590b07f770dd2369666085e112e2a8998a7e2f8011ed755611968c',
          label: '📊 View on Snapshot',
        },
      },
    ],
  },

  // ── Forum Discussions ──────────────────────────────────────────────────────
  {
    id:    'forum',
    label: '💬 Forum Discussions',
    quests: [
      {
        id:            'arbos60-elara',
        xp:            25,
        variant:       'main',
        icon:          '⚙️',
        iconBg:        'rgba(99,102,241,0.12)',
        category:      'Constitutional AIP',
        categoryColor: 'var(--purple, #6366f1)',
        title:         'ArbOS 60 Elara: Multidimensional Gas Pricing, 96 KB Stylus Limit & Base Fee Manager',
        badges:        [{ type: 'new', label: 'Discussion' }],
        description:
          'Offchain Labs has proposed ArbOS 60 Elara, the next major upgrade to Arbitrum One and ' +
          'Nova. The centrepiece is Dynamic Pricing — a first-of-its-kind multidimensional gas ' +
          'algorithm that tracks seven resource dimensions (compute, storage growth, storage access, ' +
          'calldata, etc.) and prices each independently. The upgrade also raises the Stylus smart ' +
          'contract size cap from 24 KB to 96 KB, and introduces a BaseFeeManager contract ' +
          'delegating minimum base fee adjustments to OCL for two years — without requiring ' +
          'a full DAO vote each time.',
        details: [
          'Dynamic Pricing: gas price reflects actual node resource bottlenecks — fairer costs, more sustainable capacity',
          'Stylus code size 24 KB → 96 KB: unblocks larger Rust/WASM contracts and reduces SDK friction',
          'BaseFeeManager: OCL can adjust min L2 base fee between 0.01–0.10 gwei for 2 years, DAO retains clawback',
          'AltDA Layer API & compliance filtering included but intentionally disabled on Arbitrum One / Nova',
          'Trail of Bits audit underway; temperature check vote to follow after gas target benchmarking completes',
        ],
        link: {
          href:  'https://forum.arbitrum.foundation/t/constitutional-aip-arbos-60-elara/30601',
          label: '💬 Read Full AIP Discussion',
        },
      },
    ],
  },

  // ── Other Updates ──────────────────────────────────────────────────────────
  {
    id:    'other',
    label: '📰 Other Updates',
    quests: [
      {
        id:      'stylus-sprint-demo2',
        xp:      10,
        variant: 'sub',
        icon:    '⚙️',
        title:   'Stylus Sprint Demo Day #2 — Recording Available',
        description:
          'On March 5th, Entropy hosted the second Stylus Sprint Demo Day on behalf of the ' +
          'Stylus Sprint Committee. Four teams presented their work and progress from the past year. ' +
          'The recording is publicly accessible.',
        link: {
          href:  'https://drive.google.com/file/d/1HrT332scShHTBM6yoMS2bO4UvGD9HIkz/view',
          label: '▶️ Watch Recording',
        },
      },
      {
        id:      'drip-mar10',
        xp:      10,
        variant: 'sub',
        icon:    '💧',
        title:   'DRIP Update — Entropy Advisors Summary',
        description:
          'Entropy Advisors shared their latest DRIP (DeFi Incentives Program) summary. ' +
          'Check the thread for current epoch metrics, protocol performance, and season outlook.',
        link: {
          href:  'https://x.com/EntropyAdvisors/status/2029580308354412689',
          label: '🐦 View on X',
        },
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
  {
    id:         'week-2026-03-10',
    label:      'Week of Mar 10, 2026',
    shortLabel: 'Mar 10, 2026',
    sections:   SECTIONS_MAR_10_2026,
  },
];

export const DEFAULT_WEEK_ID = WEEKS[WEEKS.length - 1].id;

export function getWeekById(id) {
  return WEEKS.find((w) => w.id === id) ?? WEEKS[WEEKS.length - 1];
}
