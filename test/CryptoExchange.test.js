const { assert } = require('chai');

const Token = artifacts.require('Token');
const CryptoExchange = artifacts.require('CryptoExchange');

require('chai').use(require('chai-as-promised')).should();

const getEthers = (amount) => web3.utils.toWei(amount.toString(), 'ether');

let token;
let cryptoExchange;

contract('CryptoExchange', ([deployer, investor]) => {
  before(async () => {
    token = await Token.new();
    cryptoExchange = await CryptoExchange.new(token.address);
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

  describe('buyTokens()', (async) => {
    let purchaseResult;
    before(async () => {
      purchaseResult = await cryptoExchange.buyTokens({
        from: investor,
        value: getEthers(1),
      });
    });

    it('Allows user to purchase tokens from CryptoExchange for a fixed price', async () => {
      const investorBalance = await token.balanceOf(investor);
      assert.equal(investorBalance.toString(), getEthers(100)); // 1 Ether => 100 tokens

      let cryptoExchangeBalance = await token.balanceOf(cryptoExchange.address);
      assert.equal(cryptoExchangeBalance.toString(), getEthers('999900'));

      cryptoExchangeBalance = await web3.eth.getBalance(cryptoExchange.address);
      assert.equal(
        cryptoExchangeBalance.toString(),
        web3.utils.toWei('1', 'Ether'),
      );

      const event = purchaseResult.logs[0].args;
      assert.equal(event.account, investor);
      assert.equal(event.token, token.address);
      assert.equal(event.amount.toString(), getEthers('100').toString());
      assert.equal(event.rate.toString(), '100');
    });
  });
});
