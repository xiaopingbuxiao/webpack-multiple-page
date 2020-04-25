const webpackMerge = require('webpack-merge')
const portfinder = require('portfinder')
const path = require('path')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const webpack = require('webpack')

const projectRoot = process.cwd()
const baseConfig = require('./webpack.base.js')


const devConfig = {
	output: {
		path: path.join(projectRoot, './dist'),
		filename: '[name].js',   // 当使用 HotModuleReplacementPlugin 时候不能使用chunkhash 报错
	},
	devtool: 'source-map',
	mode: 'development',
	devServer: {
		contentBase: path.join(projectRoot, 'dist'),
		compress: true,
		host: 'localhost',
		port: process.env.PORT || 8080,
		hot: true,
		quiet: true,  // 在 webpack-dev-serve 中使用FriendlyErrorsWebpackPlugin 需要开启
	},
	module: {
		rules: [
			{
				test: /\.(scss|css)$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
						},
					},
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
	plugins: [
		/* HMR */
		new webpack.NamedChunksPlugin(),
		new webpack.HotModuleReplacementPlugin(),
	],
}


module.exports = new Promise((reslove, reject) => {
	portfinder.basePort = 8080
	portfinder.getPortPromise().then(port => {
		process.env.PORT = port
		devConfig.devServer.port = port

		devConfig.plugins.push(
			new FriendlyErrorsWebpackPlugin({
				compilationSuccessInfo: {
					messages: [`Your application is running here: http://${devConfig.devServer.host}:${port}`],
				},
			}),
		)
		reslove(webpackMerge(baseConfig, devConfig))
	})
})
