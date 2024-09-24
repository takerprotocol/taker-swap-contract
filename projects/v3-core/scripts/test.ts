
import { ContractFactory } from 'ethers'
import { ethers, network } from 'hardhat'
import fs from 'fs'

type ContractJson = { abi: any; bytecode: string }
const artifacts: { [name: string]: ContractJson } = {
  // eslint-disable-next-line global-require
  TakerV3PoolDeployer: require('../artifacts/contracts/TakerV3PoolDeployer.sol/TakerV3PoolDeployer.json'),
  // eslint-disable-next-line global-require
  TakerV3Factory: require('../artifacts/contracts/TakerV3Factory.sol/TakerV3Factory.json'),
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
  

  let takerV3Factory = await ethers.getContractAt('TakerV3Factory', '0x0bd8cc8C16a7757b82378d5F78D788217d544D85')
  let WETHContract = await ethers.getContractAt('WETH9', WETH);
  let USDCContract = await ethers.getContractAt('IERC20Minimal', USDC);

  console.log('WETH', await WETHContract.balanceOf(owner.address));
  console.log('USDC', await USDCContract.balanceOf(owner.address));

  let tx;
  tx = await WETHContract.approve(WETH_USDC, ethers.constants.MaxUint256);

  // let tx = await takerV3Factory.createPool(
  //   WETH,
  //   USDC,
  //   500
  // );
  // await tx.wait();
  // console.log('Pool created', tx);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
