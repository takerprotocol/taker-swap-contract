// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IVToken {
    // mock
    function mintTo(address _to, uint256 _amount) external;

    // mock
    function burn(address _account, uint256 _amount) external;

    function balanceOf(address _owner) external view returns (uint256);
}
