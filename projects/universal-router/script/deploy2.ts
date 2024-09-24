/* eslint-disable camelcase */
import { ethers, run, network } from "hardhat";
import { configs } from "@pancakeswap/common/config";
import { tryVerify } from "@pancakeswap/common/verify";
import { writeFileSync } from "fs";

async function main() {
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


  const UniversalRouter = await ethers.getContractFactory("UniversalRouter");
  const universalRouter = await UniversalRouter.deploy(
    {
      permit2: "0x478f01b61cBf569b457687d3Cfd862b88b4F87d6",
      weth9: "0x3ff001c2E52BA56Ec0A9E59082a267849B8A225A",
      seaportV1_5: "0x0000000000000000000000000000000000000000",
      seaportV1_4: "0x0000000000000000000000000000000000000000",
      openseaConduit: "0x0000000000000000000000000000000000000000",
      x2y2: "0x0000000000000000000000000000000000000000",
      looksRareV2: "0x0000000000000000000000000000000000000000",
      routerRewardsDistributor: "0x0000000000000000000000000000000000000000",
      looksRareRewardsDistributor: "0x0000000000000000000000000000000000000000",
      looksRareToken: "0x0000000000000000000000000000000000000000",
      v2Factory: "0xFe6b7c4D71ED1548b0Cd37dbC01Cc95d2a16EEAa",
      v3Factory: "0x0bd8cc8C16a7757b82378d5F78D788217d544D85",
      v3Deployer: "0x5613b3665BEe028aCf1495B06a2C05e869Caf26a",
      v2InitCodeHash: "0x7566e53505922433eae48bd679cbfc938a56abe94852914510cd04d2e758e56d",
      v3InitCodeHash: "0x18827b24da592813f05c08aa604d4c25741500b9db8c1d4f26cfe2796db1c6eb",
      stableFactory: "0x7392b1aaFf77786519e612d8D4Aad58A00C9C127",
      stableInfo: "0x74f32F907525979B874A5566150c5d4eCC2aBe2E",
      takerNFTMarket: "0x0000000000000000000000000000000000000000",
    }
  );

  console.log("universalRouter deployed to:", universalRouter.address);

  // Write the address to a file.
  writeFileSync(
    `./deployments/${networkName}.json`,
    JSON.stringify(
      {
        UniversalRouter: universalRouter.address,
      },
      null,
      2
    )
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
