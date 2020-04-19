const webpackMerge = require('webpack-merge')
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
const baseConfig = require('./webpack.base.js')


const projectRoot = process.cwd()
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
			},
		],
	},
	optimization: {
		runtimeChunk: 'single',
		splitChunks: {
			cacheGroups: {
				vue_vueRouter: {
					test: (module) => {
						return /(vue|vue-router)/.test(module.context)
					},
					// test: /(vue|vue-router)/, ？？？？？此处使用test之后 如果再加了name之后会出现将css也chunks
					name: 'vendors',
					chunks: 'initial', //
					priority: -1,
				},
				common: {
					name: 'common',
					minChunks: 1,
					minSize: 0,
					chunks: 'all',
					priority: -10,

				},
			},
		},
	},
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
	],
}


module.exports = webpackMerge(baseConfig, prodConfig)
