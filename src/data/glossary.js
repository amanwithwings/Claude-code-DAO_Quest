// ─────────────────────────────────────────────────────────────────────────────
// Governance glossary — keys are lowercase; values are displayed in tooltips.
// Multiple keys can share a definition (aliases).
// Add short phrases AND their acronyms so both trigger the tooltip.
// ─────────────────────────────────────────────────────────────────────────────

const DEF = {
  ATMC:
    'Arbitrum Treasury Management Committee — the DAO-authorised body responsible ' +
    'for managing and deploying the DAO\'s non-ARB treasury capital under approved ' +
    'investment strategies.',

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

  OAT:
    'Oversight and Transparency Committee for OpCo — the committee responsible for ' +
    'overseeing the Arbitrum Foundation\'s operational company (OpCo) and ensuring ' +
    'transparency of its activities to the DAO.',

  DDA_V2:
    'Delegated Domain Allocation V2 — Questbook\'s second-generation program that ' +
    'allocates DAO grants across specific domains (DeFi, gaming, dev tooling, etc.) ' +
    'through elected domain allocators rather than a central committee.',

  AEP:
    'Arbitrum Expansion Program — a DAO-approved package of initiatives or incentives ' +
    'that expands Arbitrum\'s ecosystem, often including protocol integrations, ' +
    'liquidity programmes, or chain-level partnerships.',
};

export const GLOSSARY = {
  // ATMC
  'atmc':                                 DEF.ATMC,
  'arbitrum treasury management committee': DEF.ATMC,

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

  // OAT
  'oat':                                  DEF.OAT,
  'oat approval':                         DEF.OAT,
  'oversight and transparency committee': DEF.OAT,

  // DDA V2 (Questbook Delegated Domain Allocation)
  'dda':                                  DEF.DDA_V2,
  'dda v2':                               DEF.DDA_V2,
  'dda v2 program':                       DEF.DDA_V2,
  'delegated domain allocation':          DEF.DDA_V2,

  // AEP (Arbitrum Expansion Pack)
  'aep':                                  DEF.AEP,
  'arbitrum expansion pack':              DEF.AEP,
};
