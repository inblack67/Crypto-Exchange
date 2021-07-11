const Token = artifacts.require('Token');
const CryptoExchange = artifacts.require('CryptoExchange');

require('chai').use(require('chai-as-promised')).should();

contract('CryptoExchange', (accounts) => {
  describe('CryptoExchange deployment', async () => {
    it('Contract has a name', async () => {
      const cryptoExchange = await CryptoExchange.new();
      const name = await cryptoExchange.name();
      assert.equal(name, 'Crypto Exchange');
    });
  });
});
