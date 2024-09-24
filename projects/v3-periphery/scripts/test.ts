import bn from 'bignumber.js'
import { Contract, ContractFactory, utils, BigNumber } from 'ethers'
import { ethers, upgrades, network } from 'hardhat'
import { linkLibraries } from '../util/linkLibraries'
import { tryVerify } from '@pancakeswap/common/verify'
import { configs } from '@pancakeswap/common/config'
import fs from 'fs'
import { getMaxTick, getMinTick } from '../test/shared/ticks'
import { FeeAmount, TICK_SPACINGS } from '../test/shared/constants'
import { Interface } from 'ethers/lib/utils'

type ContractJson = { abi: any; bytecode: string }
const artifacts: { [name: string]: ContractJson } = {
  QuoterV2: require('../artifacts/contracts/lens/QuoterV2.sol/QuoterV2.json'),
  TickLens: require('../artifacts/contracts/lens/TickLens.sol/TickLens.json'),
  V3Migrator: require('../artifacts/contracts/V3Migrator.sol/V3Migrator.json'),
  TakerInterfaceMulticall: require('../artifacts/contracts/lens/TakerInterfaceMulticall.sol/TakerInterfaceMulticall.json'),
  // eslint-disable-next-line global-require
  SwapRouter: require('../artifacts/contracts/SwapRouter.sol/SwapRouter.json'),
  // eslint-disable-next-line global-require
  NFTDescriptor: require('../artifacts/contracts/libraries/NFTDescriptor.sol/NFTDescriptor.json'),
  // eslint-disable-next-line global-require
  NFTDescriptorEx: require('../artifacts/contracts/NFTDescriptorEx.sol/NFTDescriptorEx.json'),
  // eslint-disable-next-line global-require
  NonfungibleTokenPositionDescriptor: require('../artifacts/contracts/NonfungibleTokenPositionDescriptor.sol/NonfungibleTokenPositionDescriptor.json'),
  // eslint-disable-next-line global-require
  NonfungibleTokenPositionDescriptorOffChain: require('../artifacts/contracts/NonfungibleTokenPositionDescriptorOffChain.sol/NonfungibleTokenPositionDescriptorOffChain.json'),
  // eslint-disable-next-line global-require
  NonfungiblePositionManager: require('../artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json'),
  // eslint-disable-next-line global-require
  Multicall3: require('../artifacts/contracts/Multicall3.sol/Multicall3.json')
}

bn.config({ EXPONENTIAL_AT: 999999, DECIMAL_PLACES: 40 })
function encodePriceSqrt(reserve1: any, reserve0: any) {
  return BigNumber.from(
    // eslint-disable-next-line new-cap
    new bn(reserve1.toString())
      .div(reserve0.toString())
      .sqrt()
      // eslint-disable-next-line new-cap
      .multipliedBy(new bn(2).pow(96))
      .integerValue(3)
      .toString()
  )
}

function isAscii(str: string): boolean {
  return /^[\x00-\x7F]*$/.test(str)
}
function asciiStringToBytes32(str: string): string {
  if (str.length > 32 || !isAscii(str)) {
    throw new Error('Invalid label, must be less than 32 characters')
  }

  return '0x' + Buffer.from(str, 'ascii').toString('hex').padEnd(64, '0')
}


async function main() {
  const [owner] = await ethers.getSigners()
  const networkName = network.name
  console.log('owner', owner.address)

  const WETH = "0x3ff001c2E52BA56Ec0A9E59082a267849B8A225A";
  const Faucet = "0xF1F9a8a1E3e41b277467Cf0851734b7860F99E7f";
  const BTC = "0x700eF3d524CCc985ed7DC2cDe55B2fDDdaC4c398";
  const ETH = "0x1F083a15cb5F384A5321E841F184d211A9c5207d";
  const USDC = "0x91D9D766a96F849e8B373327a6Be71C829421c26";
  const USDT = "0xD94A463bc49572d095aBE2c52A78Fe5DE6beDf64";
  const WETH_USDC = "0xcb80001b82dcfc07b5fa54db05b9b08288fa80f7";
  let tx;

  let multicall3 = await ethers.getContractAt("Multicall3", "0xeDe12bB9259D3fC7a9b9C32a6D4DA4C2a69b5e4b");
  let positionManager = await ethers.getContractAt('NonfungiblePositionManager', '0xfD1FdC638B305Bb697458988C84aAC6351AA26aE');
  let swapRouter = await ethers.getContractAt('SwapRouter', '0xd68f8C129d292d45D2B703740319Ec10fE4801F2');
  let WETHContract = await ethers.getContractAt('IWETH9', WETH);
  let USDCContract = await ethers.getContractAt('TestERC20', USDC);
  let USDTContract = await ethers.getContractAt('TestERC20', USDT);
  let BTCContract = await ethers.getContractAt('TestERC20', BTC);
  let ETHContract = await ethers.getContractAt('TestERC20', ETH);


  console.log('WETH', await WETHContract.balanceOf(owner.address));
  console.log('USDC', await USDCContract.balanceOf(owner.address));
  console.log('multicall3', multicall3.address);
  console.log('positionManager', positionManager.address);
  console.log('swapRouter', swapRouter.address);

  
  const vToken = await ethers.getContractAt("VToken", "0xc006e2fA6E55c8f2170febE56f748870b5e178C3");
  console.log('vToken', vToken.address);

  tx = await vToken.mint(ethers.utils.parseUnits('100', 18));

  // tx = await WETHContract.deposit({ value: ethers.utils.parseUnits('100', 18) });
  // await tx.wait();
  // console.log('WETH deposited', tx.hash);

  // console.log('WETH allowance', await WETHContract.allowance(owner.address, '0xfD1FdC638B305Bb697458988C84aAC6351AA26aE'));
  // console.log('USDC allowance', await USDCContract.allowance(owner.address, '0xfD1FdC638B305Bb697458988C84aAC6351AA26aE'));


  // const balanceOfInterface = new Interface(['function balanceOf(address) view returns (uint256)']);

  // const calls = [ 
  //   {
  //     target: WETH,
  //     allowFailure: true, // We allow failure for all calls.
  //     callData: balanceOfInterface.encodeFunctionData('balanceOf', [owner.address]),
  //   },
  //   {
  //     target: USDC,
  //     allowFailure: true, // We allow failure for all calls.
  //     callData: balanceOfInterface.encodeFunctionData('balanceOf', [owner.address]),
  //   },
  //   {
  //     target: USDT,
  //     allowFailure: true, // We allow failure for all calls.
  //     callData: balanceOfInterface.encodeFunctionData('balanceOf', [owner.address]),
  //   },
  //   {
  //     target: BTC,
  //     allowFailure: true, // We allow failure for all calls.
  //     callData: balanceOfInterface.encodeFunctionData('balanceOf', [owner.address]),
  //   },
  //   {
  //     target: ETH,
  //     allowFailure: true, // We allow failure for all calls.
  //     callData: balanceOfInterface.encodeFunctionData('balanceOf', [owner.address]),
  //   },
  // ]
  
  // type Aggregate3Response = { success: boolean; returnData: string };
  // const results: Aggregate3Response[] = await multicall3.callStatic.aggregate3(calls);

  // for (const { success, returnData } of results) {
  //     console.log('success', success);
  //     console.log('returnData', returnData);

  //     // Decode the returnData
  //     const decoded = balanceOfInterface.decodeFunctionResult('balanceOf', returnData);
  //     console.log('decoded', decoded);
  // }

  // tx = await WETHContract.approve('0xd68f8C129d292d45D2B703740319Ec10fE4801F2', ethers.constants.MaxUint256);
  // await tx.wait();
  // console.log('WETH approved', tx.hash);

  // tx = await USDCContract.approve('0xd68f8C129d292d45D2B703740319Ec10fE4801F2', ethers.constants.MaxUint256);
  // await tx.wait();
  // console.log('USDC approved', tx.hash);

  // tx = await USDTContract.approve('0xfD1FdC638B305Bb697458988C84aAC6351AA26aE', ethers.constants.MaxUint256);
  // await tx.wait();
  // console.log('USDT approved', tx.hash);

  // tx = await BTCContract.approve('0xfD1FdC638B305Bb697458988C84aAC6351AA26aE', ethers.constants.MaxUint256);
  // await tx.wait();
  // console.log('BTC approved', tx.hash);

  // tx = await ETHContract.approve('0xfD1FdC638B305Bb697458988C84aAC6351AA26aE', ethers.constants.MaxUint256);
  // await tx.wait();
  // console.log('ETH approved', tx.hash);

  // tx = await positionManager.createAndInitializePoolIfNecessary(
  //   WETH, 
  //   USDC, 
  //   500,
  //   encodePriceSqrt(1, 1)
  // );
  // await tx.wait();
  // console.log('Pool created', tx.hash);

  

  // tx = await positionManager.mint({
  //   token0: WETH,
  //   token1: USDC,
  //   fee: 500,
  //   tickLower: getMinTick(TICK_SPACINGS[FeeAmount.MEDIUM]),
  //   tickUpper: getMaxTick(TICK_SPACINGS[FeeAmount.MEDIUM]),
  //   amount0Desired: ethers.utils.parseUnits('50', 18),
  //   amount1Desired: ethers.utils.parseUnits('13000', 6),
  //   amount0Min: 0,
  //   amount1Min: 0,
  //   recipient: owner.address,
  //   deadline: Math.floor(Date.now() / 1000) + 60 * 20000
  // });
  // await tx.wait();
  // console.log('Position minted', tx.hash);
  
// const MaxUint128: BigNumber = (/*#__PURE__*/BigNumber.from("0xffffffffffffffffffffffffffffffff"));

//   tx = await positionManager.collect({
//     tokenId: 1,
//     recipient: owner.address,
//     amount0Max: MaxUint128,
//     amount1Max: MaxUint128
//   });
//   await tx.wait();


  // let tx = await takerV3Factory.createPool(
  //   WETH,
  //   USDC,
  //   500
  // );
  // await tx.wait();
  // console.log('Pool created', tx);

  // tx = await swapRouter.exactOutputSingle({
  //   tokenIn: WETH,
  //   tokenOut: USDC,
  //   fee: 500,
  //   recipient: owner.address,
  //   deadline: Math.floor(Date.now() / 1000) + 60 * 20000,
  //   amountOut: ethers.utils.parseUnits('8.9', 6),
  //   amountInMaximum: ethers.utils.parseUnits('10', 18),
  //   sqrtPriceLimitX96: 0
  // });
  // await tx.wait();
  // console.log('Swap executed', tx.hash);

  // tx = await positionManager.createAndInitializePoolIfNecessary(
  //   USDC,
  //   USDT, 
  //   500,
  //   encodePriceSqrt(1, 1)
  // );
  // await tx.wait();
  // console.log('Pool created', tx.hash);

  // tx = await positionManager.mint({
  //   token0: USDC,
  //   token1: USDT,
  //   fee: 100,
  //   tickLower: getMinTick(TICK_SPACINGS[FeeAmount.MEDIUM]),
  //   tickUpper: getMaxTick(TICK_SPACINGS[FeeAmount.MEDIUM]),
  //   amount0Desired: ethers.utils.parseUnits('2000', await USDTContract.decimals()),
  //   amount1Desired: ethers.utils.parseUnits('2000', await USDCContract.decimals()),
  //   amount0Min: 0,
  //   amount1Min: 0,
  //   recipient: owner.address,
  //   deadline: Math.floor(Date.now() / 1000) + 60 * 20000
  // });
  // await tx.wait();
  // console.log('Position minted', tx.hash);

  //0x42842e0e00000000000000000000000033b5606763150120076308076c91f01132a799da0000000000000000000000003040b63f2fe423a6ee05add8b1665b2d9ff9b4640000000000000000000000000000000000000000000000000000000000000007

  // tx = await positionManager.multicall(
  //   ["0x42842e0e00000000000000000000000033b5606763150120076308076c91f01132a799da0000000000000000000000003040b63f2fe423a6ee05add8b1665b2d9ff9b4640000000000000000000000000000000000000000000000000000000000000007"]
  // )
  // await tx.wait();
  // console.log(tx);


}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
