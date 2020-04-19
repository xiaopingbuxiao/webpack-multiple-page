const path = require('path')
const webpack = require('webpack')
const rimraf = require('rimraf')
const Mocha = require('mocha')


const mocha = new Mocha({
  timeout: 10000
})

rimraf('./dist', () => {
  const prodConfig = require('../../lib/webpack.prod.js')
  webpack(prodConfig, (err, status) => {
    if (err) {
      console.log(err)
      process.exit(2)
    } else {
      console.log(status.toString({
        colors: true,
        modules: false,
        children: false,
      }))
      console.log('webpack build success,begin run test.... 🍎🍎🍎')
      mocha.addFile(path.join(__dirname, './html-test.js'))
      mocha.addFile(path.join(__dirname, './css-js-test.js'))
      mocha.run()
    }
  })
})
