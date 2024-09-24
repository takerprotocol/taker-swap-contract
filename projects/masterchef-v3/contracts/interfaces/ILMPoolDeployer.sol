// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "./ITakerV3Pool.sol";
import "./ILMPool.sol";

interface ILMPoolDeployer {
    function deploy(ITakerV3Pool pool) external returns (ILMPool lmPool);
}
