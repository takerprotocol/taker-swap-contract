
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

  let takerV3PoolDeployer_address = ''
  let takerV3PoolDeployer
  const TakerV3PoolDeployer = new ContractFactory(
    artifacts.TakerV3PoolDeployer.abi,
    artifacts.TakerV3PoolDeployer.bytecode,
    owner
  )
  if (!takerV3PoolDeployer_address) {
    takerV3PoolDeployer = await TakerV3PoolDeployer.deploy()

    takerV3PoolDeployer_address = takerV3PoolDeployer.address
    console.log('takerV3PoolDeployer', takerV3PoolDeployer_address)
  } else {
    takerV3PoolDeployer = new ethers.Contract(
      takerV3PoolDeployer_address,
      artifacts.TakerV3PoolDeployer.abi,
      owner
    )
  }

  let takerV3Factory_address = ''
  let takerV3Factory
  if (!takerV3Factory_address) {
    const TakerV3Factory = new ContractFactory(
      artifacts.TakerV3Factory.abi,
      artifacts.TakerV3Factory.bytecode,
      owner
    )
    takerV3Factory = await TakerV3Factory.deploy(takerV3PoolDeployer_address)

    takerV3Factory_address = takerV3Factory.address
    console.log('takerV3Factory', takerV3Factory_address)
  } else {
    takerV3Factory = new ethers.Contract(takerV3Factory_address, artifacts.TakerV3Factory.abi, owner)
  }

  // Set FactoryAddress for takerV3PoolDeployer.
  await takerV3PoolDeployer.setFactoryAddress(takerV3Factory_address);


  const contracts = {
    TakerV3Factory: takerV3Factory_address,
    TakerV3PoolDeployer: takerV3PoolDeployer_address,
  }

  fs.writeFileSync(`./deployments/${networkName}.json`, JSON.stringify(contracts, null, 2))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
