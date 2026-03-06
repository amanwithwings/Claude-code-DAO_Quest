// ─────────────────────────────────────────────────────────────────────────────
// Quest content — edit this file each week to update the digest.
// Add a new entry to WEEKS for each new week. The most recent entry is shown
// by default. Quest IDs must be unique across all weeks.
// ─────────────────────────────────────────────────────────────────────────────

// ── Week of Feb 16, 2026 ──────────────────────────────────────────────────────
const SECTIONS_FEB_16_2026 = [
  // ── Governance ────────────────────────────────────────────────────────────
  {
    id:    'governance',
    label: '🏛️ Governance',
    quests: [
      {
        id:            'dvp-quorum-tempcheck',
        xp:            30,
        variant:       'main',
        icon:          '✅',
        iconBg:        'rgba(15,169,110,0.12)',
        category:      'Temp Check Result',
        categoryColor: 'var(--green)',
        title:         'DVP Quorum Temperature Check Passes With Near-Unanimous Support',
        badges:        [{ type: 'new', label: 'Passed' }],
        description:
          'The DVP Quorum temperature check passed with near-unanimous support. ' +
          'The proposal will proceed to an onchain constitutional vote, bundled with the ' +
          'proposal cancellation update. If implemented, ArbitrumDAO\'s quorum computation ' +
          'logic will be based on delegated votable tokens.',
        details: [
          'Final tally: ✅ 211m ARB for | ❌ 3.6m ARB against',
          'Proceeds to onchain vote next week, bundled with the proposal cancellation upgrade',
          'Upgrade makes quorum computation based on delegated votable tokens — more accurate and fair',
        ],
        stats: [
          { type: 'vote-for',     label: 'For: 211m ARB' },
          { type: 'vote-against', label: 'Against: 3.6m ARB' },
        ],
        link: {
          href:  'https://snapshot.box/#/s:arbitrumfoundation.eth/proposal/0x3ac48360cb2cf6f921e391a97416a53c8ca442e3a621a9f7bb406719a8f8034d',
          label: '📊 View Snapshot Result',
        },
      },
    ],
  },

  // ── Program Reports ───────────────────────────────────────────────────────
  {
    id:    'reports',
    label: '📊 Program Reports',
    quests: [
      {
        id:            'dao-grant-report10',
        xp:            20,
        variant:       'main',
        icon:          '📋',
        iconBg:        'rgba(18,170,255,0.12)',
        category:      'Grant Program Report',
        categoryColor: 'var(--arb-blue)',
        title:         'D.A.O Grant Program Report #10 — Total Applications Cross 1,000',
        badges:        [{ type: 'new', label: 'Report' }],
        description:
          'The tenth monthly report of the D.A.O. Grant Program (covering Jan 2 – Feb 1, 2026) ' +
          'marks a milestone: total applications received have now crossed 1,000. ' +
          '109 new applications were received this month, with 49 milestone payments totalling $273K processed.',
        details: [
          '109 new applications this month; 49 milestone payments totalling $273K',
          'Applications focused on Consumer Apps, DeFi, and Developer Tooling',
          'Assets remaining: $2.7M USDC | Total Allocated: $4.0M USDC',
          'Total Disbursed: $1.9M USDC | Pending Disbursement: $2.1M USDC',
        ],
        link: {
          href:  'https://arbitrumdaogrants.notion.site/January-2026-D-A-O-Grant-Monthly-Report-303247759efb8137b8c4dcda1204697b',
          label: '📋 Read Full Report',
        },
      },
      {
        id:            'drip-jan-update',
        xp:            20,
        variant:       'main',
        icon:          '💧',
        iconBg:        'rgba(157,204,237,0.18)',
        category:      'Incentive Program Report',
        categoryColor: 'var(--arb-sky)',
        title:         'DRIP January 2026 Update — Season 1 to Conclude at 16.705M ARB Total Spend',
        badges:        [{ type: 'new', label: 'Report' }],
        description:
          'The DRIP (DeFi Incentives Program) January report covers Jan 1–31, 2026 ' +
          '(epochs 9–11). Season 1 is on track to conclude with a total spend of 16.705M ARB. ' +
          'Morpho stood out as the only protocol to grow market size (+17.1%), while most others contracted.',
        details: [
          'Epoch 10: 1.075M ARB distributed | Epoch 11: 695K ARB distributed',
          'Morpho: only protocol to grow — market size +17.1% (+$60M)',
          'Notable contractions: Euler -40.5%, Aave -18.4%, Fluid -10.4%',
          'Season 1 final projected spend: 16.705M ARB',
        ],
        link: {
          href:  'https://forum.arbitrum.foundation/t/drip-january-2025-update/30546',
          label: '📄 Read Forum Report',
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
        id:      'watchdog-feb10',
        xp:      10,
        variant: 'sub',
        icon:    '🛡️',
        title:   'Watchdog Program: February 10th Update',
        description:
          '11 new reports received (42 → 49 unique cases total). In January, 7 investigations ' +
          'completed: 5 valid misuse cases, 2 not valid. All-time: 33 investigations completed, ' +
          '24 misuse confirmed, 9 not valid.',
        link: {
          href:  'https://forum.arbitrum.foundation/t/watchdog-program-february-10th-update/30548',
          label: '📄 Read Update',
        },
      },
      {
        id:      'stylus-sprint-feb16',
        xp:      10,
        variant: 'sub',
        icon:    '⚙️',
        title:   'Stylus Sprint: January Milestones & 2nd Demo Day Scheduled (Mar 5)',
        description:
          'In January, 3 milestones submitted; 407,667 ARB in payments processed. ' +
          'Total disbursed to date: 5,173,036 ARB (~57.5% of the 9M ARB budget). ' +
          '2nd Stylus Demo Day scheduled for Thursday, March 5th, 2:30–3:30 PM UTC.',
        link: {
          href:  'https://forum.arbitrum.foundation/t/stylus-sprint-program-updates/28790/10',
          label: '📄 Read Update',
        },
      },
      {
        id:      'entropy-monthly-jan26',
        xp:      10,
        variant: 'sub',
        icon:    '🏦',
        title:   'Entropy Advisors Monthly Update — January 2026 (Treasury Management)',
        description:
          'Monthly report covering new OAT-approved deployments and strategies, ' +
          'as well as upcoming reallocations across DAO treasury assets.',
        link: {
          href:  'https://forum.arbitrum.foundation/t/entropy-advisors-monthly-update-january-2026/30549',
          label: '📄 Read Update',
        },
      },
      {
        id:      'opco-feb26',
        xp:      10,
        variant: 'sub',
        icon:    '🏢',
        title:   'OpCo February 2026 Update — RAD, Firestarters & ArbiLodge at ETH Denver',
        description:
          'OpCo monthly update covering progress on the RAD delegate rewards program and ' +
          'Firestarters grant program. OpCo also organised ArbiLodge at ETH Denver on Feb 19th.',
        link: {
          href:  'https://forum.arbitrum.foundation/t/opco-february-2026-update/30558',
          label: '📄 Read Update',
        },
      },
      {
        id:      'agv-monthly-jan26',
        xp:      10,
        variant: 'sub',
        icon:    '🗺️',
        title:   'AGV Monthly Update — January 2026',
        description:
          'Monthly update from the Arbitrum Grants Ventures (AGV) program covering ' +
          'January 2026 activity, portfolio progress, and upcoming milestones.',
        link: {
          href:  'https://forum.arbitrum.foundation/t/agv-monthly-update-january-2026/30488',
          label: '📄 Read Update',
        },
      },
      {
        id:      'grc-34-recording',
        xp:      10,
        variant: 'sub',
        icon:    '🎙️',
        title:   '34th Governance Round-Table Call — Recording & Transcript Available',
        description:
          'The recording and full transcript from the 34th GRC call are now available on the forum.',
        link: {
          href:  'https://forum.arbitrum.foundation/t/34th-grc-call-recording-transcript/30552?u=amanwithwings',
          label: '🎙️ Watch / Read',
        },
      },
    ],
  },
];

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
    id:         'week-2026-02-16',
    label:      'Week of Feb 16, 2026',
    shortLabel: 'Feb 16, 2026',
    sections:   SECTIONS_FEB_16_2026,
  },
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
