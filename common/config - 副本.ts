export const configs = {
  eth: {
    WNATIVE: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    nativeCurrencyLabel: 'ETH',
    v2Factory: '0x1097053Fd2ea711dad45caCcc45EfF7548fCB362',
    stableFactory: '0x0000000000000000000000000000000000000000',
    stableInfo: '0x0000000000000000000000000000000000000000',
    cake: '0x152649eA73beAb28c5b49B26eb48f7EAD6d4c898',
    smartRouterHelper: '0xdAecee3C08e953Bd5f89A5Cc90ac560413d709E3',
  },
  goerli: {
    WNATIVE: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
    nativeCurrencyLabel: 'GOR',
    v2Factory: '0x1097053Fd2ea711dad45caCcc45EfF7548fCB362',
    stableFactory: '0x0000000000000000000000000000000000000000',
    stableInfo: '0x0000000000000000000000000000000000000000',
    cake: '0xc2C3eAbE0368a2Ea97f485b03D1098cdD7d0c081',
    smartRouterHelper: '0xdAecee3C08e953Bd5f89A5Cc90ac560413d709E3',
  },
  bscMainnet: {
    WNATIVE: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    nativeCurrencyLabel: 'BNB',
    v2Factory: '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73',
    stableFactory: '0x25a55f9f2279a54951133d503490342b50e5cd15',
    stableInfo: '0x150c8AbEB487137acCC541925408e73b92F39A50',
    cake: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
    smartRouterHelper: '0xdAecee3C08e953Bd5f89A5Cc90ac560413d709E3',
  },
  bscTestnet: {
    WNATIVE: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
    nativeCurrencyLabel: 'tBNB',
    v2Factory: '0x6725f303b657a9451d8ba641348b6761a6cc7a17',
    stableFactory: '0xe6A00f8b819244e8Ab9Ea930e46449C2F20B6609',
    stableInfo: '0x0A548d59D04096Bc01206D58C3D63c478e1e06dB',
    cake: '0x8d008B313C1d6C7fE2982F62d32Da7507cF43551',
    smartRouterHelper: '0xdAecee3C08e953Bd5f89A5Cc90ac560413d709E3',
  },
  hardhat: {
    WNATIVE: '0x0000000000000000000000000000000000000000',
    nativeCurrencyLabel: 'BNB',
    v2Factory: '0x0000000000000000000000000000000000000000',
    stableFactory: '0x6725F303b657a9451d8BA641348b6761A6CC7a17',
    stableInfo: '0x0a4922aD4400c920144adec825B8d4D814C48303',
    cake: '0x0000000000000000000000000000000000000000',
    smartRouterHelper: '0xdAecee3C08e953Bd5f89A5Cc90ac560413d709E3',
  },
  takertest: {
    WNATIVE: '0x3ff001c2E52BA56Ec0A9E59082a267849B8A225A',   //WETH/WTAKER
    nativeCurrencyLabel: 'Taker',
    v2Factory: '0xFe6b7c4D71ED1548b0Cd37dbC01Cc95d2a16EEAa',
    stableFactory: '0x7392b1aaFf77786519e612d8D4Aad58A00C9C127',
    stableInfo: '0x74f32F907525979B874A5566150c5d4eCC2aBe2E',
    cake: '0xc006e2fA6E55c8f2170febE56f748870b5e178C3',
    smartRouterHelper: '0xcFE38e47ea9b67AEb7E9f938C11d7058Ddd546D1',
    //v2 core
    v2factory: '0xFe6b7c4D71ED1548b0Cd37dbC01Cc95d2a16EEAa',
    v2initCodehash: '0x7566e53505922433eae48bd679cbfc938a56abe94852914510cd04d2e758e56d',
    v2Router: '0x7FA612Cf2256885465b5989C773c668f1772D15C',
    StableFactory: '0x7392b1aaFf77786519e612d8D4Aad58A00C9C127',
    LPFactory: '0x15294AEEE83a1e6353152d99EFBcb4b3A9962Bc1',
    ThreePoolDeployer: '0xD5049c2a506F6F0f70dd73D326c7f99E42B8C758',
    TwoPoolDeployer: '0x89B11f855411944DbC089F1749695528EfFECCF2',
    TwoPoolInfo: '0x74f32F907525979B874A5566150c5d4eCC2aBe2E',
    ThreePoolInfo: '0x34F75EdCf177210069036516c556Af09ceeEd2C7',
    StableSwapWETHHelper: '0x60ea77B507FC96d9AEB8199BE07199Ed3850E6Db',
    StableSwapInfo: '0xEdC002f69B3cBc93D6B654f1c255fCF7D38F6965',
    //v3 core
    takerV3Factory: '0x0bd8cc8C16a7757b82378d5F78D788217d544D85',
    takerV3PoolDeployer: '0x5613b3665BEe028aCf1495B06a2C05e869Caf26a',
    outputCodeHash: '0xeCe8023c6257D8cab07E34AE3340A2f822444621',
    initCodehash: '0x18827b24da592813f05c08aa604d4c25741500b9db8c1d4f26cfe2796db1c6eb',
    //v3 periphery
    swapRouter: '0xd68f8C129d292d45D2B703740319Ec10fE4801F2',
    nonfungibleTokenPositionDescriptor: '0x5B05915cEE4564e21EaA77377558327401035b47',
    nonfungiblePositionManager: '0xfD1FdC638B305Bb697458988C84aAC6351AA26aE',
    TakerInterfaceMulticall: '0xd51DBeFac68d29a3E348A33dEe9e297219EF9767',
    V3Migrator: '0x8A5D02EC940a6c6Fef1fD816Ffd8eE463e8dcBe6',
    TickLens: '0x4Ee034Cbd45fcFc0c00dbEf38E2467bB27475506',
    QuoterV2: '0x3C948E41Bf27863103fc520e5D9940e4B7025769',

    // router
    SmartRouter: '0x6Cb3D34abddD436f8C0B257e2A5E382fde9b43e8',
    MixedRouteQuoterV1: '0x31B13E8A717c0f1Be6163156E964A3b58EdE1D76',
    routerQuoterV2: '0xFfE5f9060764b17DBb1E9250BFbFD259317437C1',
    TokenValidator: '0x2035613555ceB93c1753BDE19FBfB937f2eDF748',

    masterChefV3: '0x3040B63F2FE423A6EE05Add8b1665b2D9fF9B464',
    takerV3LmPoolDeployer: '0x123d83DfC193905E7D80afC7368D7AA222f50E58',

    permit2: '0x478f01b61cBf569b457687d3Cfd862b88b4F87d6'

  },
} as const
