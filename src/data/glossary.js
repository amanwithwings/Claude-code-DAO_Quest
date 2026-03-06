// ─────────────────────────────────────────────────────────────────────────────
// Governance glossary — keys are lowercase; values are displayed in tooltips.
// Multiple keys can share a definition (aliases).
// Add short phrases AND their acronyms so both trigger the tooltip.
// ─────────────────────────────────────────────────────────────────────────────

const DEF = {
  TEMP_CHECK:
    'A preliminary offchain vote on Snapshot used to gauge delegate sentiment ' +
    'before advancing to a formal onchain proposal. A passing temp check does not ' +
    'bind the DAO.',

  ATMC:
    'Arbitrum Treasury Management Committee — the DAO-authorised body responsible ' +
    'for managing and deploying the DAO\'s non-ARB treasury capital under approved ' +
    'investment strategies.',

  CONSTITUTIONAL_AIP:
    'A proposal that modifies the ArbitrumDAO Constitution or core governance rules. ' +
    'Requires constitutional quorum (~5% of votable ARB, currently ~219m ARB) to pass.',

  NON_CONSTITUTIONAL:
    'A standard governance proposal that does not modify the ArbitrumDAO Constitution. ' +
    'Requires only the lower non-constitutional quorum threshold (~3% of votable ARB).',

  DVP:
    'Delegated Votable Power — the total amount of ARB tokens actively delegated to ' +
    'a delegate. The DVP quorum upgrade would base quorum on total DVP rather than ' +
    'total token supply, making quorum requirements more predictable.',

  ARBOS:
    'Arbitrum\'s Operating System — the software layer within Arbitrum nodes that ' +
    'defines how transactions are processed and fees are calculated. An ArbOS upgrade ' +
    'is equivalent to a hard fork.',

  STYLUS:
    'Arbitrum\'s framework for writing smart contracts in Rust, C, and other ' +
    'WASM-compatible languages alongside Solidity contracts. Stylus contracts can be ' +
    'up to 4× larger than EVM contracts.',

  ALTDA:
    'Alternative Data Availability — solutions such as EigenDA or Celestia that ' +
    'Arbitrum chains can use to post transaction data at lower cost, as an alternative ' +
    'to posting directly to Ethereum.',

  BASE_FEE_MANAGER:
    'A smart contract that delegates authority to adjust the minimum L2 base fee ' +
    'within pre-approved bounds, allowing quick changes without requiring a full ' +
    'DAO vote each time.',

  DYNAMIC_PRICING:
    'Arbitrum\'s multidimensional gas pricing algorithm (proposed in ArbOS 60). ' +
    'Rather than a single gas price, each resource dimension — compute, storage, ' +
    'calldata, etc. — is priced independently based on real-time demand.',

  AAE:
    'Arbitrum Aligned Entity — an organisation formally recognised as aligned with ' +
    'the DAO\'s mission, empowered to take specific actions on behalf of the DAO ' +
    'within defined limits (e.g. Offchain Labs, Entropy Advisors).',

  SNAPSHOT:
    'The offchain voting platform used by ArbitrumDAO for temperature checks and ' +
    'signal votes. Votes are weighted by ARB holdings/delegations but do not ' +
    'directly execute onchain.',

  TALLY:
    'The onchain governance platform used for binding ArbitrumDAO votes. Proposals ' +
    'that pass here are executed directly on Arbitrum.',

  OAT:
    'Onchain Approval Threshold — the approval mechanism required before the ATMC ' +
    'can deploy consolidated treasury funds into a new investment strategy. ' +
    '⚠️ Definition pending confirmation.',

  // TODO: confirm definitions with team before enabling these
  // DDA_V2: '...',
  // AEP: '...',
};

export const GLOSSARY = {
  // Temperature check
  'temperature check':                    DEF.TEMP_CHECK,

  // ATMC
  'atmc':                                 DEF.ATMC,
  'arbitrum treasury management committee': DEF.ATMC,

  // Constitutional / non-constitutional
  'constitutional aip':                   DEF.CONSTITUTIONAL_AIP,
  'non-constitutional':                   DEF.NON_CONSTITUTIONAL,

  // DVP
  'dvp':                                  DEF.DVP,
  'delegated votable power':              DEF.DVP,

  // ArbOS
  'arbos':                                DEF.ARBOS,

  // Stylus
  'stylus':                               DEF.STYLUS,

  // AltDA
  'altda':                                DEF.ALTDA,
  'alternative data availability':        DEF.ALTDA,

  // BaseFeeManager
  'basefeemanager':                       DEF.BASE_FEE_MANAGER,

  // Dynamic Pricing
  'dynamic pricing':                      DEF.DYNAMIC_PRICING,

  // AAE
  'aae':                                  DEF.AAE,
  'arbitrum aligned entity':              DEF.AAE,

  // Platforms
  'snapshot':                             DEF.SNAPSHOT,
  'tally':                                DEF.TALLY,

  // OAT (pending confirmation)
  'oat approval':                         DEF.OAT,
};
