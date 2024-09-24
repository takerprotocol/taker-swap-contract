import { verifyContract } from '@pancakeswap/common/verify'
import { sleep } from '@pancakeswap/common/sleep'
import { configs } from '@pancakeswap/common/config'

async function main() {
  const networkName = network.name
  const config = configs[networkName as keyof typeof configs]

  if (!config) {
    throw new Error(`No config found for network ${networkName}`)
  }
  const deployedContracts_masterchef_v3 = await import(`../../masterchef-v3/deployments/${networkName}.json`)
  const deployedContracts_v3_lm_pool = await import(`../../v3-lm-pool/deployments/${networkName}.json`)
  const deplpyedContracts_multicall3 = await import(`../../v3-lm-pool/deployments/${networkName}.json`)

  // Verify takerV3LmPoolDeployer
  console.log('Verify takerV3LmPoolDeployer')
  await verifyContract(deployedContracts_v3_lm_pool.TakerV3LmPoolDeployer, [
    deployedContracts_masterchef_v3.MasterChefV3,
  ])
  await sleep(10000)

  //verify multicall3
  console.log('Verify multicall3')
  await verifyContract(deplpyedContracts_multicall3.Multicall3, [])
  await sleep(10000)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
