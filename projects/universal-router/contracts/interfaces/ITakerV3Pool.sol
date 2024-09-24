// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.5.0;

import './pool/ITakerV3PoolImmutables.sol';
import './pool/ITakerV3PoolState.sol';
import './pool/ITakerV3PoolDerivedState.sol';
import './pool/ITakerV3PoolActions.sol';
import './pool/ITakerV3PoolOwnerActions.sol';
import './pool/ITakerV3PoolEvents.sol';

/// @title The interface for a TakerSwap V3 Pool
/// @notice A TakerSwap pool facilitates swapping and automated market making between any two assets that strictly conform
/// to the ERC20 specification
/// @dev The pool interface is broken up into many smaller pieces
interface ITakerV3Pool is
    ITakerV3PoolImmutables,
    ITakerV3PoolState,
    ITakerV3PoolDerivedState,
    ITakerV3PoolActions,
    ITakerV3PoolOwnerActions,
    ITakerV3PoolEvents
{

}
