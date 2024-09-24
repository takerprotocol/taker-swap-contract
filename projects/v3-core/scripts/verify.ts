import { verifyContract } from '@pancakeswap/common/verify'
import { sleep } from '@pancakeswap/common/sleep'

async function main() {
  const networkName = network.name
  const deployedContracts = await import(`@pancakeswap/v3-core/deployments/${networkName}.json`)

  // Verify TakerV3PoolDeployer
  console.log('Verify TakerV3PoolDeployer')
  await verifyContract(deployedContracts.TakerV3PoolDeployer)
  await sleep(10000)

  // Verify takerV3Factory
  console.log('Verify takerV3Factory')
  await verifyContract(deployedContracts.TakerV3Factory, [deployedContracts.TakerV3PoolDeployer])
  await sleep(10000)

  //verify TakerV3Pool
  console.log('Verify TakerV3Pool')
  await verifyContract("0xcb80001b82dcfc07b5fa54db05b9b08288fa80f7", [])
  await sleep(10000)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
