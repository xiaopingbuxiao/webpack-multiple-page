const path = require('path')
const webpack = require('webpack')

const projectRoot = process.cwd()

module.exports = {
  entry: {
    library: [
      'vue',
      'vue-router',
    ],
  },
  output: {
    filename: '[name].dll.js',
    path: path.join(projectRoot, 'dll/library'),
    library: '[name]',
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: path.join(projectRoot, 'manifest.json'),
    }),
  ],
}
