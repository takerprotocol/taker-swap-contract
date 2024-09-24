// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

/// @title Interface for TakerSwap NFT Market
interface ITakerNFTMarket {
    /**
     * @notice Buy token with ETH by matching the price of an existing ask order
     * @param _collection: contract address of the NFT
     * @param _tokenId: tokenId of the NFT purchased
     */
    function buyTokenUsingETH(
        address _collection, 
        uint256 _tokenId
    ) external payable;

    /**
     * @notice Buy token with WETH by matching the price of an existing ask order
     * @param _collection: contract address of the NFT
     * @param _tokenId: tokenId of the NFT purchased
     * @param _price: price (must be equal to the askPrice set by the seller)
     */
    function buyTokenUsingWETH(
        address _collection,
        uint256 _tokenId,
        uint256 _price
    ) external;
}