import { ethers } from 'hardhat'
import TakerV3PoolArtifact from '../artifacts/contracts/TakerV3Pool.sol/TakerV3Pool.json'

const hash = ethers.utils.keccak256(TakerV3PoolArtifact.bytecode)
console.log(hash)
