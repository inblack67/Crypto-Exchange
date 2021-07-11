const CryptoExchange = artifacts.require('CryptoExchange');
const Token = artifacts.require('Token');

module.exports = async function (deployer) {
  await deployer.deploy(Token);
  const token = await Token.deployed();

  await deployer.deploy(CryptoExchange);
  const cryptoExchange = await CryptoExchange.deployed();

  // transfer all funds to cryptoExchange
  await token.transfer(cryptoExchange.address, '1000000000000000000000000');
};
