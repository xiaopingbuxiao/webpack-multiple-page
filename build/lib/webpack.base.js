const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const glob = require('glob')

const projectRoot = process.cwd()
const VueLoaderPlugin = require('vue-loader/lib/plugin')


const setMPA = () => {
	const entry = {}
	const htmlWebpackPlugins = []
	const entryFiles = glob.sync(path.join(projectRoot, './src/page/*/index.js'))
	Object.keys(entryFiles).map(index => {
		const entryFile = entryFiles[index]
		const match = entryFile.match(/src\/page\/(.*)\/index.js/)
		const pageName = match && match[1]
		entry[pageName] = entryFile
		htmlWebpackPlugins.push(new HtmlWebpackPlugin({
			template: path.join(projectRoot, `./templateHtml/${pageName}.html`),
			filename: `${pageName}.html`,
			chunks: [`${pageName}`],
			inject: true,
			minify: {
				html5: true,
				collapseWhitespace: true,
				preserveLineBreaks: false,
				minifyCSS: true,
				minifyJS: true,
				removeComments: false,
			},
		}))
	})
	console.log(entry)
	return {
		entry,
		htmlWebpackPlugins,
	}
}

const { entry, htmlWebpackPlugins } = setMPA()


module.exports = {
	entry: entry,
	module: {
		rules: [
			{
				test: /\.vue$/,
				use: ['vue-loader', 'eslint-loader'],
			},
			{
				test: /\.js$/,
				use: ['babel-loader', 'eslint-loader'],
			},
			{
				test: /\.(png|jpg|jpeg|gif)$/i,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10240,
							name: 'img/[name]_[hash:8].[ext]',
						},
					},
				],
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: 'fonts/[name]_[hash:8].[ext]', // hash:7 代表 7 位数的 hash
				},
			},
		],
	},
	plugins: [
		new VueLoaderPlugin(),
	].concat(htmlWebpackPlugins),
}


