// ─────────────────────────────────────────────────────────────────────────────
// Quest content — edit this file each week to update the digest.
// Add a new entry to WEEKS for each new week. The most recent entry is shown
// by default. Quest IDs must be unique across all weeks.
// ─────────────────────────────────────────────────────────────────────────────

// ── Week of Feb 24, 2026 ──────────────────────────────────────────────────────
const SECTIONS_FEB_24_2026 = [
  // ── Active Votes ───────────────────────────────────────────────────────────
  {
    id:    'votes',
    label: '🗳️ Active Votes',
    quests: [
      {
        id:            'dvp-quorum-feb24',
        xp:            30,
        variant:       'main',
        icon:          '🗳️',
        iconBg:        'rgba(248,81,73,0.12)',
        category:      'On-Chain Constitutional Proposal',
        categoryColor: 'var(--red)',
        title:         'DVP Quorum & Proposal Cancellation: Voting Starts Thursday',
        badges:        [{ type: 'new', label: 'Vote Thursday' }],
        description:
          'A bundled constitutional proposal introducing two governance upgrades: ' +
          '(1) changes to ArbitrumDAO\'s quorum computation logic, and ' +
          '(2) the ability for a proposer to cancel their proposal during the 3-day pending period. ' +
          'Voting opens Thursday and runs for 14 days. Current constitutional quorum requirement is ~219m ARB.',
        details: [
          'DVP Quorum upgrade: improves how quorum is computed to be more predictable',
          'Proposal cancellation: proposers can pull a proposal before voting begins — a useful safety valve',
          'Voting starts Thursday and lasts 14 days — mark your calendar!',
          'Constitutional quorum requirement: ~219m ARB',
        ],
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
        id:            'watchdog-bounty',
        xp:            20,
        variant:       'main',
        icon:          '🛡️',
        iconBg:        'rgba(18,170,255,0.12)',
        category:      'Program Update',
        categoryColor: 'var(--arb-blue)',
        title:         'Watchdog Program: Bounty Structure Update',
        badges:        [{ type: 'new', label: 'Updated' }],
        description:
          'The Watchdog program (bounty misuse detection) is transitioning to a USD-denominated ' +
          'payout model to protect bounty value from ARB price fluctuations. Updated severity-based ' +
          'amounts have been set, along with a new ARB expenditure cap and an increased recovery bonus.',
        details: [
          'New USD-denominated payouts: $200 (Low), $1,000 (Medium), $2,000 (High)',
          'Maximum ARB expenditure cap uses $0.08 as the floor price',
          'Recovery bonus increased from 10% to 15%',
          'Change ensures the program stays attractive to bounty hunters regardless of token price',
        ],
        link: {
          href:  'https://forum.arbitrum.foundation/t/watchdog-program-february-18th-bounty-structure-update/30565',
          label: '💬 View Forum Post',
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
        id:      'timeboost-reserve-feb24',
        xp:      10,
        variant: 'sub',
        icon:    '⚡',
        title:   'Timeboost Reserve Price Raised to 0.0075 ETH',
        description:
          'OCL is updating the Timeboost reserve price from 0.001 ETH to 0.0075 ETH in ' +
          'response to observed market behavior and changes in how different market participants ' +
          'are interacting with the sequencer priority system.',
        link: {
          href:  'https://forum.arbitrum.foundation/t/announcement-of-reserve-price-change/30564',
          label: '📄 Read Announcement',
        },
      },
      {
        id:      'opco-ethdenver',
        xp:      10,
        variant: 'sub',
        icon:    '🏔️',
        title:   'OpCo Events Recap at ETH Denver',
        description:
          'Recap of the Arbitrum Foundation\'s OpCo presence and events at ETH Denver — ' +
          'covering what happened, who showed up, and what conversations are continuing.',
        link: {
          href:  'https://forum.arbitrum.foundation/t/opco-events-recap/30266/6?u=amanwithwings',
          label: '📄 Read Recap',
        },
      },
      {
        id:      'wakeup-labs-stylus',
        xp:      10,
        variant: 'sub',
        icon:    '🔧',
        title:   '[Grantee Report] WakeUp Labs: AssemblyScript SDK for Arbitrum Stylus',
        description:
          'Milestone update from WakeUp Labs on the AssemblyScript integration for the ' +
          'Arbitrum Stylus SDK — enabling AssemblyScript developers to build Stylus contracts, ' +
          'expanding the Arbitrum dev ecosystem.',
        link: {
          href:  'https://forum.arbitrum.foundation/t/wakeup-labs-update-thread-assemblyscript-integration-for-the-arbitrum-stylus-sdk/29038/9?u=amanwithwings',
          label: '📄 Read Update',
        },
      },
      {
        id:      'morning-run-ethdenver',
        xp:      10,
        variant: 'sub',
        icon:    '🏃',
        title:   'Arbitrum DAO Morning Run at ETHDenver 2026 — Final Report',
        description:
          'Final report from the Arbitrum DAO Morning Run community event at ETHDenver 2026, ' +
          'covering attendance, outcomes, and community engagement.',
        link: {
          href:  'https://forum.arbitrum.foundation/t/final-report-arbitrum-dao-morning-run-at-ethdenver-2026/30571',
          label: '📄 Read Final Report',
        },
      },
    ],
  },
];

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
        link: {
          href:  'https://www.tally.xyz/gov/arbitrum/proposal/112177996398925212273579485756315626637025938627124330171390356044681347897430?govId=eip155:42161:0xf07DeD9dC292157749B6Fd268E37DF6EA38395B9',
          label: '🗳️ Vote on Tally',
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
          'route surplus and idle non-ARB funds from DAO programs into the Arbitrum ' +
          'Treasury Management Committee (ATMC) — putting idle capital to work ' +
          'generating yield instead of sitting dormant.',
        details: [
          'Currently the DDA V2 Program and D.A.O. Grant Program hold significant idle funds',
          'Funds would move to AF-chosen wallets immediately when feasible',
          'Each new ATMC deployment using consolidated funds requires separate OAT approval',
          'Temperature check expected this week — engage on the forum now!',
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
          'The regular open governance call is happening today. A great chance to hear ' +
          'from delegates, ask questions, and engage with active proposals live.',
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

// ── Weeks registry ────────────────────────────────────────────────────────────
// Add a new object here each week. Most-recent entry = default on load.

export const WEEKS = [
  {
    id:         'week-2026-02-24',
    label:      'Week of Feb 24, 2026',
    shortLabel: 'Feb 24, 2026',
    sections:   SECTIONS_FEB_24_2026,
  },
  {
    id:         'week-2026-03-04',
    label:      'Week of Mar 4, 2026',
    shortLabel: 'Mar 4, 2026',
    sections:   SECTIONS_MAR_4_2026,
  },
];

export const DEFAULT_WEEK_ID = WEEKS[WEEKS.length - 1].id;

export function getWeekById(id) {
  return WEEKS.find((w) => w.id === id) ?? WEEKS[WEEKS.length - 1];
}
