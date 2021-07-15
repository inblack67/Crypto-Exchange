// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./Token.sol";

contract CryptoExchange {
    string public name = "Crypto Exchange"; // access via contract.name()
    Token public token;
    uint256 public rate = 100; // 1 Ether => 100 Cryto Tokens

    constructor(Token _token) public {
        token = _token;
    }

    // msg.sender => address of the caller
    // msg.value => how much ether was sent
    // payable
    function buyTokens() public payable {
        uint256 amount = msg.value * rate;
        token.transfer(msg.sender, amount);
    }
}
