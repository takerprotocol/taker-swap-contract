/* eslint-disable camelcase */
import { ethers, run, network } from "hardhat";
import { configs } from "@pancakeswap/common/config";
import { tryVerify } from "@pancakeswap/common/verify";
import { writeFileSync } from "fs";

async function main() {
  const [owner] = await ethers.getSigners()
  // Get network data from Hardhat config (see hardhat.config.ts).
  const networkName = network.name;
  // Check if the network is supported.
  console.log(`Deploying to ${networkName} network...`);

  // Compile contracts.
  await run("compile");
  console.log("Compiled contracts...");

  const config = configs[networkName as keyof typeof configs];
  if (!config) {
    throw new Error(`No config found for network ${networkName}`);
  }
  const WETH = "0x3ff001c2E52BA56Ec0A9E59082a267849B8A225A";
  const Faucet = "0xF1F9a8a1E3e41b277467Cf0851734b7860F99E7f";
  const BTC = "0x700eF3d524CCc985ed7DC2cDe55B2fDDdaC4c398";
  const ETH = "0x1F083a15cb5F384A5321E841F184d211A9c5207d";
  const USDC = "0x91D9D766a96F849e8B373327a6Be71C829421c26";
  const USDT = "0xD94A463bc49572d095aBE2c52A78Fe5DE6beDf64";
  const WETH_USDC = "0xcb80001b82dcfc07b5fa54db05b9b08288fa80f7";
  

  let positionManager = await ethers.getContractAt('NonfungiblePositionManager', '0xfD1FdC638B305Bb697458988C84aAC6351AA26aE');
  let WETHContract = await ethers.getContractAt('TestERC20', WETH);
  let USDCContract = await ethers.getContractAt('TestERC20', USDC);

  console.log('WETH', await WETHContract.balanceOf(owner.address));
  console.log('USDC', await USDCContract.balanceOf(owner.address));
  const masterChefV3 = await ethers.getContractAt("MasterChefV3", "0x3040B63F2FE423A6EE05Add8b1665b2D9fF9B464");
  const multicall3 = await ethers.getContractAt("Multicall3", "0xeDe12bB9259D3fC7a9b9C32a6D4DA4C2a69b5e4b");
  let tx;


}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
