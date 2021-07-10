const CryptoExchange = artifacts.require('CryptoExchange');

module.exports = function (deployer) {
  deployer.deploy(CryptoExchange);
};
