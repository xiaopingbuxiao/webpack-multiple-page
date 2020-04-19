const { expect } = require('chai')



describe('webpack.dev.js test case', (done) => {
  const devConfig = require('../../lib/webpack.dev.js')
  devConfig.then(res => {
    it('build config mode', () => {
      expect(res.mode).to.includes('development')
    });
  })
});
