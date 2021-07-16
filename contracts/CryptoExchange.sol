// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./Token.sol";

contract CryptoExchange {
    string public name = "Crypto Exchange"; // access via contract.name()
    Token public token;
    uint256 public rate = 100; // 1 Ether => 100 Cryto Tokens

    event TokenPurchased(
        address account,
        address token,
        uint256 amount,
        uint256 rate
    );

    constructor(Token _token) public {
        token = _token;
    }

    // msg.sender => address of the caller
    // msg.value => how much ether was sent
    // payable
    function buyTokens() public payable {
        uint256 amount = msg.value * rate;

        // require => stops exec the code if the cond is false
        require(token.balanceOf(address(this)) >= amount);

        token.transfer(msg.sender, amount);

        emit TokenPurchased(msg.sender, address(token), amount, rate);
    }
}
