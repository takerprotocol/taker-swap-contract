# Solidity API

## TestTakerV3Router

### swapForExact0Multi

```solidity
function swapForExact0Multi(address recipient, address poolInput, address poolOutput, uint256 amount0Out) external
```

### swapForExact1Multi

```solidity
function swapForExact1Multi(address recipient, address poolInput, address poolOutput, uint256 amount1Out) external
```

### SwapCallback

```solidity
event SwapCallback(int256 amount0Delta, int256 amount1Delta)
```

### takerV3SwapCallback

```solidity
function takerV3SwapCallback(int256 amount0Delta, int256 amount1Delta, bytes data) public
```

Called to `msg.sender` after executing a swap via ITakerV3Pool#swap.

_In the implementation you must pay the pool tokens owed for the swap.
The caller of this method must be checked to be a TakerV3Pool deployed by the canonical TakerV3Factory.
amount0Delta and amount1Delta can both be 0 if no tokens were swapped._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount0Delta | int256 | The amount of token0 that was sent (negative) or must be received (positive) by the pool by the end of the swap. If positive, the callback must send that amount of token0 to the pool. |
| amount1Delta | int256 | The amount of token1 that was sent (negative) or must be received (positive) by the pool by the end of the swap. If positive, the callback must send that amount of token1 to the pool. |
| data | bytes | Any data passed through by the caller via the ITakerV3PoolActions#swap call |

