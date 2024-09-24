import { abi as POOL_ABI } from '@pancakeswap/v3-core/artifacts/contracts/TakerV3Pool.sol/TakerV3Pool.json'
import { Contract, Wallet } from 'ethers'
import { ITakerV3Pool } from '../../typechain-types'

export default function poolAtAddress(address: string, wallet: Wallet): ITakerV3Pool {
  return new Contract(address, POOL_ABI, wallet) as ITakerV3Pool
}
