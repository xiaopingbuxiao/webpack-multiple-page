const { expect } = require('chai')



describe('webpack.base.js test case', (done) => {
  const baseConfig = require('../../lib/webpack.base.js')
  it('entry', () => {
    expect(baseConfig.entry.index).to.includes('page/index/index.js')
    expect(baseConfig.entry.about).to.include('page/about/index.js')
  });
});


