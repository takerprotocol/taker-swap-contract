// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./interfaces/IVToken.sol";

// Mock TToken
contract VToken is IVToken, ERC20 {
    constructor() ERC20("VToken Mock", "VToken") {}

    function balanceOf(
        address account
    ) public view override(IVToken, ERC20) returns (uint256) {
        return super.balanceOf(account);
    }

    function mintTo(address _to, uint256 _amount) public {
        _mint(_to, _amount);
    }

    function burn(address _account, uint256 _amount) public {
        _burn(_account, _amount);
    }

    function mintForTest(uint256 _amount) public {
        _mint(msg.sender, _amount);
    }
}
