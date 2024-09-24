import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'
import '@typechain/hardhat'
import 'dotenv/config'
import { NetworkUserConfig } from 'hardhat/types'
import 'solidity-docgen';
require('dotenv').config({ path: require('find-config')('.env') })

const bscTestnet: NetworkUserConfig = {
  url: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
  chainId: 97,
  accounts: [process.env.KEY_TESTNET!],
}

const bscMainnet: NetworkUserConfig = {
  url: 'https://bsc-dataseed.binance.org/',
  chainId: 56,
  accounts: [process.env.KEY_MAINNET!],
}

const goerli: NetworkUserConfig = {
  url: 'https://rpc.ankr.com/eth_goerli',
  chainId: 5,
  accounts: [process.env.KEY_GOERLI!],
}

const eth: NetworkUserConfig = {
  url: 'https://eth.llamarpc.com',
  chainId: 1,
  accounts: [process.env.KEY_ETH!],
}

const takertest: NetworkUserConfig = {
  url: 'https://rpc-testnet.taker.xyz',
  chainId: 2748,
  accounts: [process.env.PRIVATE_KEY!],
}

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: '0.7.6',
      }
    ],
    overrides: {
      'contracts/Multicall3.sol': 
      {
        version: '0.8.12',
      },
    },
  },
  networks: {
    hardhat: {},
    ...(process.env.KEY_TESTNET && { bscTestnet }),
    ...(process.env.KEY_MAINNET && { bscMainnet }),
    ...(process.env.KEY_GOERLI && { goerli }),
    ...(process.env.KEY_ETH && { eth }),
    ...(process.env.PRIVATE_KEY && { takertest }),
  },
  etherscan: {
    // apiKey: process.env.ETHERSCAN_API_KEY,
    apiKey: {
      takertest: 'abc'
    },
    customChains: [
      {
        network: "takertest",
        chainId: 2748,
        urls: {
          apiURL: "https://testnet-explorer.taker.xyz/api",
          browserURL: "https://testnet-explorer.taker.xyz"
        }
      }
    ]
  },
  paths: {
    sources: './contracts/',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts',
  },
}

export default config
