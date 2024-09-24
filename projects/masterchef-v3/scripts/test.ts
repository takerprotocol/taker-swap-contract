/* eslint-disable camelcase */
import { ethers, run, network } from "hardhat";
import { configs } from "@pancakeswap/common/config";
import { tryVerify } from "@pancakeswap/common/verify";
import { writeFileSync } from "fs";
import { deploy } from "@openzeppelin/hardhat-upgrades/dist/utils";

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

  const masterChefV3 = await ethers.getContractAt("MasterChefV3", "0x3040B63F2FE423A6EE05Add8b1665b2D9fF9B464");

  const vToken = await ethers.getContractAt("VToken", "0xc006e2fA6E55c8f2170febE56f748870b5e178C3");
  console.log("vToken", vToken.address);
  console.log("deoloyer balance", await vToken.balanceOf(owner.address));
  console.log("masterchef balance", await vToken.balanceOf(masterChefV3.address));

  console.log("masterchef 2 userPositionInfos", await masterChefV3.userPositionInfos(4));

  console.log("poolInfo 0", await masterChefV3.poolInfo(1));

  console.log("getLatestPeriodInfo", await masterChefV3.getLatestPeriodInfo("0xCB80001b82DCFc07B5fa54DB05B9b08288Fa80F7"));

  // let tx = await vToken.approve(masterChefV3.address, ethers.constants.MaxUint256);
  // await tx.wait();

  // tx = await masterChefV3.setReceiver(owner.address);
  // await tx.wait();
  console.log("receiver", await masterChefV3.receiver());

  // let tx = await masterChefV3.upkeep(ethers.utils.parseEther("1000"), 60*60*24*30, true);
  // await tx.wait();

  let tx = await masterChefV3.set(1, 100, true);
  await tx.wait();

  console.log("latestPeriodVeTakerPerSecond", await masterChefV3.latestPeriodVeTakerPerSecond());

  const pool = await ethers.getContractAt("ITakerV3Pool", "0xCB80001b82DCFc07B5fa54DB05B9b08288Fa80F7");

  console.log("pool lm", await pool.lmPool());

  const lmPool = await ethers.getContractAt("ILMPool", await pool.lmPool());

  console.log("tokenid 2 getRewardGrowthInside", await lmPool.getRewardGrowthInside("-887250", "887250"));

  console.log("masterchef 1 pending", await masterChefV3.pendingVeTaker(1));
  console.log("masterchef 2 pending", await masterChefV3.pendingVeTaker(2));
  console.log("masterchef 3 pending", await masterChefV3.pendingVeTaker(3));
  console.log("masterchef 4 pending", await masterChefV3.pendingVeTaker(4));
  console.log("masterchef 5 pending", await masterChefV3.pendingVeTaker(5));
  console.log("masterchef 6 pending", await masterChefV3.pendingVeTaker(6));
  console.log("masterchef 7 pending", await masterChefV3.pendingVeTaker(7));
  console.log("masterchef 8 pending", await masterChefV3.pendingVeTaker(8));
  console.log("masterchef 9 pending", await masterChefV3.pendingVeTaker(9));

  // let tx = await masterChefV3.add(100, "0xcb80001b82dcfc07b5fa54db05b9b08288fa80f7", false);
  // await tx.wait();
  // console.log("Added pool 1", await masterChefV3.poolInfo(1));

  // console.log(await masterChefV3.userPositionInfos(7))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
