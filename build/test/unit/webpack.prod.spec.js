const { expect } = require('chai')

describe('webpack.prod.js test case', (done) => {
  const pordConfig = require('../../lib/webpack.prod.js')
  it('prod config mode devtool', () => {
    expect(pordConfig.mode).to.equal('production')
    expect(pordConfig.devtool).to.be.undefined
  });
});


