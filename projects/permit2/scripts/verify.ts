import { verifyContract } from "@pancakeswap/common/verify";
import { sleep } from "@pancakeswap/common/sleep";
import { configs } from "@pancakeswap/common/config";

async function main() {
  const networkName = network.name;
  const config = configs[networkName as keyof typeof configs];

  if (!config) {
    throw new Error(`No config found for network ${networkName}`);
  }
  const deployedContracts_permit2 = await import(`../deployments/${networkName}.json`);
  console.log(deployedContracts_permit2);

  // Verify permit2
  console.log("Verify permit2");
  await verifyContract(deployedContracts_permit2.Permit2, []);
  await sleep(10000);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
