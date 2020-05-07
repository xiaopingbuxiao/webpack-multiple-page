const webpackMerge = require('webpack-merge')
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const TerserPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
const PurgecssPlugin = require('purgecss-webpack-plugin')
const glob = require('glob')

const smp = new SpeedMeasurePlugin()


const baseConfig = require('./webpack.base.js')
const projectRoot = process.cwd()


const PATHS = {
  path: path.join(projectRoot, 'src'),
}

const prodConfig = {
  output: {
    path: path.join(projectRoot, './dist'),
    filename: 'js/[name]_[chunkhash:8].js', // js使用chunkhash
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../', // css中引用的图片 字体路径 publicPath
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sassOptions: {
                fiber: require('fibers'),     // 对 sass 变异进行一个优化 https://www.npmjs.com/package/sass-loader
              },
            },
          },
        ],
        include: path.join(projectRoot, './src'),
      },
    ],
  },
  // optimization: {
  // 	minimize: true,
  // 	minimizer: [new TerserPlugin({
  // 		parallel: true,
  // 	})],
  // 	runtimeChunk: 'single',
  // 	splitChunks: {
  // 		cacheGroups: {
  // 			vue_vueRouter: {
  // 				test: (module) => {
  // 					return /(vue|vue-router)/.test(module.context)
  // 				},
  // 				// test: /(vue|vue-router)/, ？？？？？此处使用test之后 如果再加了name之后会出现将css也chunks
  // 				name: 'vendors',
  // 				chunks: 'initial', //
  // 				priority: -1,
  // 			},
  // 			common: {
  // 				name: 'common',
  // 				minChunks: 1,
  // 				minSize: 0,
  // 				chunks: 'all',
  // 				priority: -10,

  // 			},
  // 		},
  // 	},
  // },
  plugins: [

    function () { // 异常的退出  默认是异常输出是1
      this.hooks.done.tap('done', function (stats) {
        if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') === -1) {
          console.log('build error')
          process.exit(111)
        }
      })
    },
    // new HtmlWebpackExternalsPlugin({ // 有一点问题 index 页面一只会注入两次
    // 	externals: [
    // 		{
    // 			module: 'vue',
    // 			entry: 'dist/vue.runtime.min.js',
    // 			global: 'Vue',
    // 		},
    // 	],
    // }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({		// css 抽离为单个文件  同时此插件是可以通过配置 css 的chunk分包的
      filename: 'css/[name]_[contenthash:8].css',
    }),
    new OptimizeCssAssetsWebpackPlugin({ // 压缩css
      assetNameRegExp: /\.css$/,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
    }),
    new webpack.DllReferencePlugin({
      manifest: require('../../manifest.json'),
    }),
    new AddAssetHtmlWebpackPlugin([
      {
        filepath: require.resolve('../../dll/library/library.dll.js'),
        publicPath: './dll',
        outputPath: './dll',
      },
    ]),
    // new PurgecssPlugin({ // 擦除无用css 配合vue使用时有问题
    // 	paths: glob.sync(`${PATHS.src}/**/*`,  { nodir: true }),
    // }),
    // new BundleAnalyzerPlugin(),
  ],
  resolve: {
    modules: [path.join(projectRoot, './node_modules')],
  },
  stats: {
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false,
  },
}


module.exports = webpackMerge(baseConfig, prodConfig)
// module.exports = smp.wrap(webpackMerge(baseConfig, prodConfig)) // 构建速度分析
