import { BigNumber } from 'ethers'
import { ethers } from 'hardhat'
import { MockTimeTakerV3Pool } from '../../typechain-types/contracts/test/MockTimeTakerV3Pool'
import { TestERC20 } from '../../typechain-types/contracts/test/TestERC20'
import { TakerV3Factory } from '../../typechain-types/contracts/TakerV3Factory'
import { TakerV3PoolDeployer } from '../../typechain-types/contracts/TakerV3PoolDeployer'
import { TestTakerV3Callee } from '../../typechain-types/contracts/test/TestTakerV3Callee'
import { TestTakerV3Router } from '../../typechain-types/contracts/test/TestTakerV3Router'
import { MockTimeTakerV3PoolDeployer } from '../../typechain-types/contracts/test/MockTimeTakerV3PoolDeployer'
import TakerV3LmPoolArtifact from '@pancakeswap/v3-lm-pool/artifacts/contracts/TakerV3LmPool.sol/TakerV3LmPool.json'

import { Fixture } from 'ethereum-waffle'

interface FactoryFixture {
  factory: TakerV3Factory
}

interface DeployerFixture {
  deployer: TakerV3PoolDeployer
}

async function factoryFixture(): Promise<FactoryFixture> {
  const { deployer } = await deployerFixture()
  const factoryFactory = await ethers.getContractFactory('TakerV3Factory')
  const factory = (await factoryFactory.deploy(deployer.address)) as TakerV3Factory
  return { factory }
}
async function deployerFixture(): Promise<DeployerFixture> {
  const deployerFactory = await ethers.getContractFactory('TakerV3PoolDeployer')
  const deployer = (await deployerFactory.deploy()) as TakerV3PoolDeployer
  return { deployer }
}

interface TokensFixture {
  token0: TestERC20
  token1: TestERC20
  token2: TestERC20
}

async function tokensFixture(): Promise<TokensFixture> {
  const tokenFactory = await ethers.getContractFactory('TestERC20')
  const tokenA = (await tokenFactory.deploy(BigNumber.from(2).pow(255))) as TestERC20
  const tokenB = (await tokenFactory.deploy(BigNumber.from(2).pow(255))) as TestERC20
  const tokenC = (await tokenFactory.deploy(BigNumber.from(2).pow(255))) as TestERC20

  const [token0, token1, token2] = [tokenA, tokenB, tokenC].sort((tokenA, tokenB) =>
    tokenA.address.toLowerCase() < tokenB.address.toLowerCase() ? -1 : 1
  )

  return { token0, token1, token2 }
}

type TokensAndFactoryFixture = FactoryFixture & TokensFixture

interface PoolFixture extends TokensAndFactoryFixture {
  swapTargetCallee: TestTakerV3Callee
  swapTargetRouter: TestTakerV3Router
  createPool(
    fee: number,
    tickSpacing: number,
    firstToken?: TestERC20,
    secondToken?: TestERC20
  ): Promise<MockTimeTakerV3Pool>
}

// Monday, October 5, 2020 9:00:00 AM GMT-05:00
export const TEST_POOL_START_TIME = 1601906400

export const poolFixture: Fixture<PoolFixture> = async function (): Promise<PoolFixture> {
  const { factory } = await factoryFixture()
  const { token0, token1, token2 } = await tokensFixture()

  const MockTimeTakerV3PoolDeployerFactory = await ethers.getContractFactory('MockTimeTakerV3PoolDeployer')
  const MockTimeTakerV3PoolFactory = await ethers.getContractFactory('MockTimeTakerV3Pool')

  const calleeContractFactory = await ethers.getContractFactory('TestTakerV3Callee')
  const routerContractFactory = await ethers.getContractFactory('TestTakerV3Router')

  const swapTargetCallee = (await calleeContractFactory.deploy()) as TestTakerV3Callee
  const swapTargetRouter = (await routerContractFactory.deploy()) as TestTakerV3Router

  const TakerV3LmPoolFactory = await ethers.getContractFactoryFromArtifact(TakerV3LmPoolArtifact)

  return {
    token0,
    token1,
    token2,
    factory,
    swapTargetCallee,
    swapTargetRouter,
    createPool: async (fee, tickSpacing, firstToken = token0, secondToken = token1) => {
      const mockTimePoolDeployer =
        (await MockTimeTakerV3PoolDeployerFactory.deploy()) as MockTimeTakerV3PoolDeployer
      const tx = await mockTimePoolDeployer.deploy(
        factory.address,
        firstToken.address,
        secondToken.address,
        fee,
        tickSpacing
      )

      const receipt = await tx.wait()
      const poolAddress = receipt.events?.[0].args?.pool as string

      const mockTimeTakerV3Pool = MockTimeTakerV3PoolFactory.attach(poolAddress) as MockTimeTakerV3Pool

      await (
        await factory.setLmPool(
          poolAddress,
          (
            await TakerV3LmPoolFactory.deploy(
              poolAddress,
              ethers.constants.AddressZero,
              Math.floor(Date.now() / 1000)
            )
          ).address
        )
      ).wait()

      return mockTimeTakerV3Pool
    },
  }
}
