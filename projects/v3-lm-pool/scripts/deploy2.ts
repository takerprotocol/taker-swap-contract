import { ethers, network } from 'hardhat'
import { configs } from '@pancakeswap/common/config'
import { tryVerify } from '@pancakeswap/common/verify'
import fs from 'fs'
import { abi } from '@pancakeswap/v3-core/artifacts/contracts/TakerV3Factory.sol/TakerV3Factory.json'

import { parseEther } from 'ethers/lib/utils'
const currentNetwork = network.name

async function main() {
  const [owner] = await ethers.getSigners()
  // Remember to update the init code hash in SC for different chains before deploying
  const networkName = network.name
  const config = configs[networkName as keyof typeof configs]
  if (!config) {
    throw new Error(`No config found for network ${networkName}`)
  }

  const v3DeployedContracts = await import(`../../v3-core/deployments/${networkName}.json`)
  const mcV3DeployedContracts = await import(`../../masterchef-v3/deployments/${networkName}.json`)

  const takerV3Factory_address = v3DeployedContracts.TakerV3Factory
  console.log('takerV3Factory_address:', takerV3Factory_address)
  console.log('MasterChefV3:', mcV3DeployedContracts.MasterChefV3)

  const TakerV3LmPoolDeployer = await ethers.getContractFactory('TakerV3LmPoolDeployer')
  const takerV3LmPoolDeployer = await TakerV3LmPoolDeployer.deploy(mcV3DeployedContracts.MasterChefV3)

  console.log('takerV3LmPoolDeployer deployed to:', takerV3LmPoolDeployer.address)

  const takerV3Factory = new ethers.Contract(takerV3Factory_address, abi, owner)

  await takerV3Factory.setLmPoolDeployer(takerV3LmPoolDeployer.address)

  const contracts = {
    TakerV3LmPoolDeployer: takerV3LmPoolDeployer.address,
  }
  fs.writeFileSync(`./deployments/${networkName}.json`, JSON.stringify(contracts, null, 2))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
