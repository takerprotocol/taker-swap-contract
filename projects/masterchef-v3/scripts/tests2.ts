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
  console.log("0x29033B001dA92E7577760bb05e2C78210f1D13d0 balance", await vToken.balanceOf("0x29033B001dA92E7577760bb05e2C78210f1D13d0"));

  let tx = await vToken.mintTo("0x29033B001dA92E7577760bb05e2C78210f1D13d0", ethers.utils.parseEther("100000"));
  await tx.wait();

  console.log("0x29033B001dA92E7577760bb05e2C78210f1D13d0 balance", await vToken.balanceOf("0x29033B001dA92E7577760bb05e2C78210f1D13d0"));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
