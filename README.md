# Taker V3

## Deployments

1. Add Key in `.env` file. It's a private key of the account that will deploy the contracts and should be gitignored.
2. bscTestnet `KEY_TESTNET` or bsc `KEY_MAINNET`
3. add `ETHERSCAN_API_KEY` in `.env` file. It's an API key for etherscan.
4. `yarn` in root directory
5. `NETWORK=$NETWORK yarn zx v3-deploy.mjs` where `$NETWORK` is either `eth`, `goerli`, `bscMainnet`, `bscTestnet` or `hardhat` (for local testing)
6. `NETWORK=$NETWORK yarn zx v3-verify.mjs` where `$NETWORK` is either `eth`, `goerli`, `bscMainnet`, `bscTestnet` or `hardhat` (for local testing)

BTC deployed to: 0x700eF3d524CCc985ed7DC2cDe55B2fDDdaC4c398, true
ETH deployed to: 0x1F083a15cb5F384A5321E841F184d211A9c5207d, true
USDC deployed to: 0x91D9D766a96F849e8B373327a6Be71C829421c26, true
USDT deployed to: 0xD94A463bc49572d095aBE2c52A78Fe5DE6beDf64, true

Faucet deployed to: 0xF1F9a8a1E3e41b277467Cf0851734b7860F99E7f, true
