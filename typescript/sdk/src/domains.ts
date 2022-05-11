import { CompleteChainMap, Domain } from './types';

// IDs can be generated in many ways-- for example, in JS:
// > Array.from('celo').map((c, i) => c.charCodeAt(0).toString(16).padStart(2, '0')).join('')
// '63656c6f'

/**
 * Mainnets
 */
export const celo: Domain = {
  id: 0x63656c6f, // b'celo' interpreted as an int
};

export const ethereum: Domain = {
  id: 0x657468, // b'eth' interpreted as an int
};

export const avalanche: Domain = {
  id: 0x61766178, // b'avax' interpreted as an int
  paginate: {
    // Needs to be low to avoid RPC timeouts
    blocks: 100000,
    from: 6765067,
  },
};

export const polygon: Domain = {
  id: 0x706f6c79, // b'poly' interpreted as an int
  paginate: {
    // Needs to be low to avoid RPC timeouts
    blocks: 10000,
    from: 19657100,
  },
};

/**
 * Testnets
 */
export const alfajores: Domain = {
  id: 1000,
};

export const fuji: Domain = {
  id: 43113,
};

export const goerli: Domain = {
  id: 5,
};

export const kovan: Domain = {
  id: 3000,
};

export const mumbai: Domain = {
  id: 80001,
  paginate: {
    // eth_getLogs and eth_newFilter are limited to a 10,000 blocks range
    blocks: 10000,
    from: 22900000,
  },
};

export const rinkarby: Domain = {
  id: 4000,
};

export const rinkeby: Domain = {
  id: 2000,
};

export const ropsten: Domain = {
  id: 3,
};

const testDomains = {
  test1: {
    id: 13371,
  },
  test2: {
    id: 13372,
  },
  test3: {
    id: 13373,
  },
};

export const bsctestnet: Domain = {
  id: 0x62732d74, // b'bs-t' interpreted as an int
};

export const arbitrumrinkeby: Domain = {
  id: 0x61722d72, // b'ar-r' interpreted as an int
};

export const optimismkovan: Domain = {
  id: 0x6f702d6b, // b'op-k' interpreted as an int
};

export const auroratestnet: Domain = {
  id: 0x61752d74, // b'au-t' interpreted as an int
};

export const domains: CompleteChainMap<Domain> = {
  celo,
  ethereum,
  avalanche,
  polygon,
  alfajores,
  fuji,
  goerli,
  mumbai,
  rinkeby,
  rinkarby,
  ropsten,
  kovan,
  bsctestnet,
  arbitrumrinkeby,
  optimismkovan,
  auroratestnet,
  ...testDomains,
};