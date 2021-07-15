const { assert } = require('chai');

const Token = artifacts.require('Token');
const CryptoExchange = artifacts.require('CryptoExchange');

require('chai').use(require('chai-as-promised')).should();

const getEthers = (amount) => web3.utils.toWei(amount.toString(), 'ether');

let token;
let cryptoExchange;

contract('CryptoExchange', (accounts) => {
  before(async () => {
    token = await Token.new();
    cryptoExchange = await CryptoExchange.new();
    await token.transfer(cryptoExchange.address, getEthers(1000000)); // 1 million
  });

  describe('Token deployment', async () => {
    it('Token has a name', async () => {
      const name = await token.name();
      assert.equal(name, 'Crypto Token');
    });
  });

  describe('CryptoExchange deployment', async () => {
    it('Contract has a name', async () => {
      const name = await cryptoExchange.name();
      assert.equal(name, 'Crypto Exchange');
    });

    it('Contract has tokens', async () => {
      const balance = await token.balanceOf(cryptoExchange.address);
      assert.equal(balance.toString(), getEthers(1000000));
    });
  });
});
