import { ChainMap } from '../types.js';

export type CCIPAddresses = {
  armProxy: {
    address: string;
    version: string;
  };
  chainSelector: string;
  feeTokens: string[];
  registryModule: {
    address: string;
    version: string;
  };
  router: {
    address: string;
    version: string;
  };
  tokenAdminRegistry: {
    address: string;
    version: string;
  };
};

// ABI for CCIP's IRouterClient interface
// https://github.com/smartcontractkit/chainlink/blob/2724ef8937488de77b320e4e9692ed0dcb3a165a/contracts/src/v0.8/ccip/interfaces/IRouterClient.sol#L6-L39
export const CCIP_ROUTER_CLIENT_ABI = [
  'function isChainSupported(uint64 chainSelector) external view returns (bool)',
  'function getSupportedTokens(uint64 chainSelector) external view returns (address[] memory tokens)',
];

// Copied from chainlink docs repo
// https://github.com/smartcontractkit/documentation/blob/0ffd661733de2b946011dd3279011a79a25a31e0/src/config/data/ccip/v1_2_0/mainnet/chains.json
export const CCIP_NETWORKS: ChainMap<CCIPAddresses> = {
  avalanche: {
    armProxy: {
      address: '0xcBD48A8eB077381c3c4Eb36b402d7283aB2b11Bc',
      version: '1.0.0',
    },
    chainSelector: '6433500567565415381',
    feeTokens: ['LINK', 'WAVAX'],
    registryModule: {
      address: '0x9c093872cd5931D975C4d4B4a3a8c61a5767E5c1',
      version: '1.5.0',
    },
    router: {
      address: '0xF4c7E640EdA248ef95972845a62bdC74237805dB',
      version: '1.2.0',
    },
    tokenAdminRegistry: {
      address: '0xc8df5D618c6a59Cc6A311E96a39450381001464F',
      version: '1.5.0',
    },
  },
  bitlayer: {
    armProxy: {
      address: '0xcaa6131cEe85ba2F140cBa05F6825aC60B6CEA56',
      version: '1.5.0',
    },
    chainSelector: '7937294810946806131',
    feeTokens: ['LINK', 'WBTC'],
    registryModule: {
      address: '0x907BF5A4489d2b14EBDf9C9BDEA60AAe2Da54ef4',
      version: '1.5.0',
    },
    router: {
      address: '0x6c0aA29330c58dda07faD577fF5a0280823a910c',
      version: '1.2.0',
    },
    tokenAdminRegistry: {
      address: '0xd999758aEB04BDa755Ae78344FFF5534947620CD',
      version: '1.5.0',
    },
  },
  bob: {
    armProxy: {
      address: '0xe4D8E0A02C61f6DDe95255E702fe1237428673D8',
      version: '1.5.0',
    },
    chainSelector: '3849287863852499584',
    feeTokens: ['LINK', 'WETH'],
    registryModule: {
      address: '0x74C8B508BF3d22f811972625D9e055c2604d1021',
      version: '1.5.0',
    },
    router: {
      address: '0x827716e74F769AB7b6bb374A29235d9c2156932C',
      version: '1.2.0',
    },
    tokenAdminRegistry: {
      address: '0xa57d04119AFf4884F8602213E58d8AaAD18229cb',
      version: '1.5.0',
    },
  },
  bsquared: {
    armProxy: {
      address: '0x1C6Faa5762860261014a355a9efF2bEea2255851',
      version: '1.5.0',
    },
    chainSelector: '5406759801798337480',
    feeTokens: ['LINK', 'WBTC'],
    registryModule: {
      address: '0x790b7770D12AdBa4d3F920d7A994E7a4f275037c',
      version: '1.5.0',
    },
    router: {
      address: '0x9C34e9A192d7a4c2cf054668C1122C028C43026c',
      version: '1.2.0',
    },
    tokenAdminRegistry: {
      address: '0x2e1543255119CfB9D3501E32d7f5B244E59A06F4',
      version: '1.5.0',
    },
  },
  bsc: {
    armProxy: {
      address: '0x9e09697842194f77d315E0907F1Bda77922e8f84',
      version: '1.0.0',
    },
    chainSelector: '11344663589394136015',
    feeTokens: ['LINK', 'WBNB'],
    registryModule: {
      address: '0xfa4C3f58D2659AFe4F964C023e6AfD183C374435',
      version: '1.5.0',
    },
    router: {
      address: '0x34B03Cb9086d7D758AC55af71584F81A598759FE',
      version: '1.2.0',
    },
    tokenAdminRegistry: {
      address: '0x736Fd8660c443547a85e4Eaf70A49C1b7Bb008fc',
      version: '1.5.0',
    },
  },
  celo: {
    armProxy: {
      address: '0x56e0507d4E69D98bE7Eb4ada01d2315596F9f281',
      version: '1.0.0',
    },
    chainSelector: '1346049177634351622',
    feeTokens: ['LINK', 'WCELO'],
    registryModule: {
      address: '0x858B064d15bD54fcdfaf087A4AE4BaabF724d9E9',
      version: '1.5.0',
    },
    router: {
      address: '0xfB48f15480926A4ADf9116Dca468bDd2EE6C5F62',
      version: '1.2.0',
    },
    tokenAdminRegistry: {
      address: '0xf19e0555fAA9051e277eeD5A0DcdB13CDaca39a9',
      version: '1.5.0',
    },
  },
  corn: {
    armProxy: {
      address: '0x91ca2Aa7429e5F702f1F750b317AB604d5a6a16e',
      version: '1.5.0',
    },
    chainSelector: '9043146809313071210',
    feeTokens: ['LINK', 'WBTCN'],
    registryModule: {
      address: '0xD65b9D6eb4C6C387B9B43129aA4274Acc0010129',
      version: '1.5.0',
    },
    router: {
      address: '0x183f6069A0D5c2DEC1Dd1eCF3B1581e12dEb4Efe',
      version: '1.2.0',
    },
    tokenAdminRegistry: {
      address: '0xCd51e57cD26b9B5eecbfe3d96DAabF3d12A663DA',
      version: '1.5.0',
    },
  },
  metis: {
    armProxy: {
      address: '0xd99cc1d64027E07Cd2AaE871E16bb32b8F401998',
      version: '1.0.0',
    },
    chainSelector: '8805746078405598895',
    feeTokens: ['LINK', 'WMETIS'],
    registryModule: {
      address: '0xE4B147224Db9B6E3776E4B3CEda31b3cE232e2FA',
      version: '1.5.0',
    },
    router: {
      address: '0x7b9FB8717D306e2e08ce2e1Efa81F026bf9AD13c',
      version: '1.2.0',
    },
    tokenAdminRegistry: {
      address: '0x3af897541eB03927c7431bF68884A6C2C23b683f',
      version: '1.5.0',
    },
  },
  arbitrum: {
    armProxy: {
      address: '0xC311a21e6fEf769344EB1515588B9d535662a145',
      version: '1.0.0',
    },
    chainSelector: '4949039107694359620',
    feeTokens: ['GHO', 'LINK', 'WETH'],
    registryModule: {
      address: '0x818792C958Ac33C01c58D5026cEc91A86e9071d7',
      version: '1.5.0',
    },
    router: {
      address: '0x141fa059441E0ca23ce184B6A78bafD2A517DdE8',
      version: '1.2.0',
    },
    tokenAdminRegistry: {
      address: '0x39AE1032cF4B334a1Ed41cdD0833bdD7c7E7751E',
      version: '1.5.0',
    },
  },
  base: {
    armProxy: {
      address: '0xC842c69d54F83170C42C4d556B4F6B2ca53Dd3E8',
      version: '1.0.0',
    },
    chainSelector: '15971525489660198786',
    feeTokens: ['LINK', 'WETH'],
    registryModule: {
      address: '0x1A5f2d0c090dDB7ee437051DA5e6f03b6bAE1A77',
      version: '1.5.0',
    },
    router: {
      address: '0x881e3A65B4d4a04dD529061dd0071cf975F58bCD',
      version: '1.2.0',
    },
    tokenAdminRegistry: {
      address: '0x6f6C373d09C07425BaAE72317863d7F6bb731e37',
      version: '1.5.0',
    },
  },
  blast: {
    armProxy: {
      address: '0x50dbd1e73ED032f42B5892E5F3689972FefAc880',
      version: '1.0.0',
    },
    chainSelector: '4411394078118774322',
    feeTokens: ['LINK', 'WETH'],
    registryModule: {
      address: '0xa277610fF9A04364d2b80f26C9DFb32Be5e45D94',
      version: '1.5.0',
    },
    router: {
      address: '0x12e0B8E349C6fb7E6E40713E8125C3cF1127ea8C',
      version: '1.2.0',
    },
    tokenAdminRegistry: {
      address: '0x846Fccd01D4115FD1E81267495773aeB33bF1dC7',
      version: '1.5.0',
    },
  },
  hashkey: {
    armProxy: {
      address: '0x59F168858472c5ECC217588678F6c378951Bd524',
      version: '1.5.0',
    },
    chainSelector: '7613811247471741961',
    feeTokens: ['LINK', 'WHSK'],
    registryModule: {
      address: '0xE9A76b7071F0bDaF5968583BEDF6CC537613A1F7',
      version: '1.5.0',
    },
    router: {
      address: '0xf2Fd62c083F3BF324e99ce157D1a42d7EbA77f1d',
      version: '1.2.0',
    },
    tokenAdminRegistry: {
      address: '0x4b238f757f842280FeA88A1c2B4186b71eF8BC5E',
      version: '1.5.0',
    },
  },
  ink: {
    armProxy: {
      address: '0x3A293fa336E118900AD0f2EcfeC0DAa6A4DeDaA1',
      version: '1.5.0',
    },
    chainSelector: '3461204551265785888',
    feeTokens: ['LINK', 'WETH'],
    registryModule: {
      address: '0xDB51A5855d6a41f40D26591f843d6ac4c7CE5B73',
      version: '1.5.0',
    },
    router: {
      address: '0xca7c90A52B44E301AC01Cb5EB99b2fD99339433A',
      version: '1.2.0',
    },
    tokenAdminRegistry: {
      address: '0xEb062d21c713A3d940BB0FaECFdC387d6Ea23697',
      version: '1.5.0',
    },
  },
  linea: {
    armProxy: {
      address: '0x1F8fbCf559f08FE7c4076f0d68DB861e1E27f95b',
      version: '1.0.0',
    },
    chainSelector: '4627098889531055414',
    feeTokens: ['LINK', 'WETH'],
    registryModule: {
      address: '0x2eab209352C0A5d71a79Cc889caAE6692520A891',
      version: '1.5.0',
    },
    router: {
      address: '0x549FEB73F2348F6cD99b9fc8c69252034897f06C',
      version: '1.2.0',
    },
    tokenAdminRegistry: {
      address: '0xBc933cEE67d2b1c08490ee8C51E2dF653a713534',
      version: '1.5.0',
    },
  },
  mantle: {
    armProxy: {
      address: '0x91E2186E93F0ECeDDCdf9850078F104daB085E79',
      version: '1.5.0',
    },
    chainSelector: '1556008542357238666',
    feeTokens: ['LINK', 'WMNT'],
    registryModule: {
      address: '0x869c8c4e23668A83151267636f190F5A17A104FD',
      version: '1.5.0',
    },
    router: {
      address: '0x670052635a9850bb45882Cb2eCcF66bCff0F41B7',
      version: '1.2.0',
    },
    tokenAdminRegistry: {
      address: '0x000A744940eB5D857c0d61d97015DFc83107404F',
      version: '1.5.0',
    },
  },
  mode: {
    armProxy: {
      address: '0xA0876B45271615c737781185C2B5ada60ed2D2B9',
      version: '1.0.0',
    },
    chainSelector: '7264351850409363825',
    feeTokens: ['LINK', 'WETH'],
    registryModule: {
      address: '0xF54d38E4844c5f6E5Aab0AF7557ef5cb1cA4253e',
      version: '1.5.0',
    },
    router: {
      address: '0x24C40f13E77De2aFf37c280BA06c333531589bf1',
      version: '1.2.0',
    },
    tokenAdminRegistry: {
      address: '0xB4b40c010A547dff6A22d94bC2C1c1e745b62aB2',
      version: '1.5.0',
    },
  },
  optimism: {
    armProxy: {
      address: '0x55b3FCa23EdDd28b1f5B4a3C7975f63EFd2d06CE',
      version: '1.0.0',
    },
    chainSelector: '3734403246176062136',
    feeTokens: ['LINK', 'WETH'],
    registryModule: {
      address: '0x3E2f636Ff8e12728638C4c4b34d282a7fDF0e5B8',
      version: '1.5.0',
    },
    router: {
      address: '0x3206695CaE29952f4b0c22a169725a865bc8Ce0f',
      version: '1.2.0',
    },
    tokenAdminRegistry: {
      address: '0x657c42abE4CD8aa731Aec322f871B5b90cf6274F',
      version: '1.5.0',
    },
  },
  polygonzkevm: {
    armProxy: {
      address: '0x272fB92E5D43ffcCEb56bBE5b2D7B88a86235c48',
      version: '1.0.0',
    },
    chainSelector: '4348158687435793198',
    feeTokens: ['LINK', 'WETH'],
    registryModule: {
      address: '0xE97273AD89a082950e7C17c4593d7743c987B8bb',
      version: '1.5.0',
    },
    router: {
      address: '0xA9999937159B293c72e2367Ce314cb3544e7C1a3',
      version: '1.2.0',
    },
    tokenAdminRegistry: {
      address: '0xe87fB6c46DCAADA001681819d2bD3c64f58D8963',
      version: '1.5.0',
    },
  },
  scroll: {
    armProxy: {
      address: '0x68B38980aD70650a6f3229BA156e5c1F88A21320',
      version: '1.5.0',
    },
    chainSelector: '13204309965629103672',
    feeTokens: ['LINK', 'WETH'],
    registryModule: {
      address: '0x80E3946A4d3306c903545fdfCEDB57639C00A99d',
      version: '1.5.0',
    },
    router: {
      address: '0x9a55E8Cab6564eb7bbd7124238932963B8Af71DC',
      version: '1.2.0',
    },
    tokenAdminRegistry: {
      address: '0x846dEA1c1706FC35b4aa78B32d31F1599DAA47b4',
      version: '1.5.0',
    },
  },
  worldchain: {
    armProxy: {
      address: '0x7DE7Ef73cF001ff15b3aA558855D7eeC439d43ab',
      version: '1.5.0',
    },
    chainSelector: '2049429975587534727',
    feeTokens: ['LINK', 'WETH'],
    registryModule: {
      address: '0x5c3511917797e01FB26E94fA3D30E71135d93826',
      version: '1.5.0',
    },
    router: {
      address: '0x5fd9E4986187c56826A3064954Cfa2Cf250cfA0f',
      version: '1.2.0',
    },
    tokenAdminRegistry: {
      address: '0x02Fe6ab4fb0943F58D9D925d1d2cbA9474997Ed0',
      version: '1.5.0',
    },
  },
  xlayer: {
    armProxy: {
      address: '0x326B01f673681dAd72cd386CCe12FFF717be32cD',
      version: '1.0.0',
    },
    chainSelector: '3016212468291539606',
    feeTokens: ['LINK', 'WOKB'],
    registryModule: {
      address: '0x3c3B4DfEda43296dFf1b2C6e5a3e4E1e1a6D5766',
      version: '1.5.0',
    },
    router: {
      address: '0xF2b6Cb7867EB5502C3249dD37D7bc1Cc148e5232',
      version: '1.2.0',
    },
    tokenAdminRegistry: {
      address: '0xeCf1eAEE01E82F3388dECD7f4C3792374f3f72F3',
      version: '1.5.0',
    },
  },
  zircuit: {
    armProxy: {
      address: '0xf735667F2F3193d407089bb4c50824941821b156',
      version: '1.5.0',
    },
    chainSelector: '17198166215261833993',
    feeTokens: ['LINK', 'WETH'],
    registryModule: {
      address: '0xE8FD6dE668fD120df5A00E03ce0de71eA5C6d408',
      version: '1.5.0',
    },
    router: {
      address: '0x0A6436B56378D305729713ac332ccdCD367f3918',
      version: '1.2.0',
    },
    tokenAdminRegistry: {
      address: '0x47d2D93EEDb694bf445E7F6458f17669459612c7',
      version: '1.5.0',
    },
  },
  zksync: {
    armProxy: {
      address: '0x2aBB46A2D32220b8801CE96CAbC32dd2dA7b7B20',
      version: '1.0.0',
    },
    chainSelector: '1562403441176082196',
    feeTokens: ['LINK', 'WETH'],
    registryModule: {
      address: '0xab0731056C23b85eDd62F12E716fC75fc1fB1219',
      version: '1.5.0',
    },
    router: {
      address: '0x748Fd769d81F5D94752bf8B0875E9301d0ba71bB',
      version: '1.2.0',
    },
    tokenAdminRegistry: {
      address: '0x100a47C9DB342884E3314B91cec076BbAC8e619c',
      version: '1.5.0',
    },
  },
  ethereum: {
    armProxy: {
      address: '0x411dE17f12D1A34ecC7F45f49844626267c75e81',
      version: '1.0.0',
    },
    chainSelector: '5009297550715157269',
    feeTokens: ['GHO', 'LINK', 'WETH'],
    registryModule: {
      address: '0x13022e3e6C77524308BD56AEd716E88311b2E533',
      version: '1.5.0',
    },
    router: {
      address: '0x80226fc0Ee2b096224EeAc085Bb9a8cba1146f7D',
      version: '1.2.0',
    },
    tokenAdminRegistry: {
      address: '0xb22764f98dD05c789929716D677382Df22C05Cb6',
      version: '1.5.0',
    },
  },
  polygon: {
    armProxy: {
      address: '0xf1ceAa46D8d13Cac9fC38aaEF3d3d14754C5A9c2',
      version: '1.0.0',
    },
    chainSelector: '4051577828743386545',
    feeTokens: ['LINK', 'WMATIC'],
    registryModule: {
      address: '0x30CcdEa6a6B521B2B6Fa1Cdc2fd38FB2c1cC82b3',
      version: '1.5.0',
    },
    router: {
      address: '0x849c5ED5a80F5B408Dd4969b78c2C8fdf0565Bfe',
      version: '1.2.0',
    },
    tokenAdminRegistry: {
      address: '0x00F027eA6D0fb03256A15E9182B2B9227A4931d8',
      version: '1.5.0',
    },
  },
  astar: {
    armProxy: {
      address: '0x7317D216F3DCDa40144a54eC9bA09829a423cb35',
      version: '1.0.0',
    },
    chainSelector: '6422105447186081193',
    feeTokens: ['LINK', 'WASTR'],
    registryModule: {
      address: '0x9c54A7E067E5bdB8e1A44eA7a657053780d35d58',
      version: '1.5.0',
    },
    router: {
      address: '0x8D5c5CB8ec58285B424C93436189fB865e437feF',
      version: '1.2.0',
    },
    tokenAdminRegistry: {
      address: '0xB98eEd70e3cE8E342B0f770589769E3A6bc20A09',
      version: '1.5.0',
    },
  },
  ronin: {
    armProxy: {
      address: '0xceA253a8c2BB995054524d071498281E89aACD59',
      version: '1.5.0',
    },
    chainSelector: '6916147374840168594',
    feeTokens: ['LINK', 'WRON'],
    registryModule: {
      address: '0x5055DA89A16b71fEF91D1af323b139ceDe2d8320',
      version: '1.5.0',
    },
    router: {
      address: '0x46527571D5D1B68eE7Eb60B18A32e6C60DcEAf99',
      version: '1.2.0',
    },
    tokenAdminRegistry: {
      address: '0x90e83d532A4aD13940139c8ACE0B93b0DdbD323a',
      version: '1.5.0',
    },
  },
  sei: {
    armProxy: {
      address: '0x32C67585dA17839245c75D80d36c8CBD7d35E1a5',
      version: '1.5.0',
    },
    chainSelector: '9027416829622342829',
    feeTokens: ['LINK', 'WSEI'],
    registryModule: {
      address: '0xd7327405609E3f9566830b1aCF79E25AC0a9DA4B',
      version: '1.5.0',
    },
    router: {
      address: '0xAba60dA7E88F7E8f5868C2B6dE06CB759d693af0',
      version: '1.2.0',
    },
    tokenAdminRegistry: {
      address: '0x910a46cA93E8086BF1d7D65190eE6AEe5256Bd61',
      version: '1.5.0',
    },
  },
  shibarium: {
    armProxy: {
      address: '0xD2bdb98dA1Ff575d091CA5b76412C23Cba88CA02',
      version: '1.5.0',
    },
    chainSelector: '3993510008929295315',
    feeTokens: ['LINK', 'WBONE'],
    registryModule: {
      address: '0xB6e8B0158CDD1AaF280f53604b80686787BB9199',
      version: '1.5.0',
    },
    router: {
      address: '0xc2CA5d5C17911e4B838194b51585DdF8fe5116C1',
      version: '1.2.0',
    },
    tokenAdminRegistry: {
      address: '0x995d2Aa233aBeaCA2a64Edf898AE9F4e01bE15B9',
      version: '1.5.0',
    },
  },
  soneium: {
    armProxy: {
      address: '0x3117f515D763652A32d3D6D447171ea7c9d57218',
      version: '1.5.0',
    },
    chainSelector: '12505351618335765396',
    feeTokens: ['LINK', 'WETH'],
    registryModule: {
      address: '0x1d0B6B3ef94dD6A68b7E16bd8B01fca9EA8e3d6E',
      version: '1.5.0',
    },
    router: {
      address: '0x8C8B88d827Fe14Df2bc6392947d513C86afD6977',
      version: '1.2.0',
    },
    tokenAdminRegistry: {
      address: '0x5ba21F6824400B91F232952CA6d7c8875C1755a4',
      version: '1.5.0',
    },
  },
  sonic: {
    armProxy: {
      address: '0x60536Ef486DB5E0e1771874E31485c12e3c2844f',
      version: '1.5.0',
    },
    chainSelector: '1673871237479749969',
    feeTokens: ['LINK', 'WS'],
    registryModule: {
      address: '0xB9Ab30Fe6fa11780244815Bb87818D7Bd9beb529',
      version: '1.5.0',
    },
    router: {
      address: '0xB4e1Ff7882474BB93042be9AD5E1fA387949B860',
      version: '1.2.0',
    },
    tokenAdminRegistry: {
      address: '0x2961Cb47b5111F38d75f415c21ceB4120ddd1b69',
      version: '1.5.0',
    },
  },
  wemix: {
    armProxy: {
      address: '0x2375959c6571AC7a83c164C6FCcbd09E7782773d',
      version: '1.0.0',
    },
    chainSelector: '5142893604156789321',
    feeTokens: ['LINK', 'WWEMIX'],
    registryModule: {
      address: '0xe89241cbE74349EA74a0c23823A516B3c74A289B',
      version: '1.5.0',
    },
    router: {
      address: '0x7798b795Fde864f4Cd1b124a38Ba9619B7F8A442',
      version: '1.2.0',
    },
    tokenAdminRegistry: {
      address: '0xE993e046AC50659800a91Bab0bd2daBF59CbD171',
      version: '1.5.0',
    },
  },
  gnosis: {
    armProxy: {
      address: '0xf5e5e1676942520995c1e39aFaC58A75Fe1cd2bB',
      version: '1.0.0',
    },
    chainSelector: '465200170687744372',
    feeTokens: ['LINK', 'WXDAI'],
    registryModule: {
      address: '0xdf529b48fCDfd095c81497E435585Ed465D600A2',
      version: '1.5.0',
    },
    router: {
      address: '0x4aAD6071085df840abD9Baf1697d5D5992bDadce',
      version: '1.2.0',
    },
    tokenAdminRegistry: {
      address: '0x73BC11423CBF14914998C23B0aFC9BE0cb5B2229',
      version: '1.5.0',
    },
  },
};
