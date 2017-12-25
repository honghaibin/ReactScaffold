const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackMerge = require('webpack-merge')
const webpackConfigCommon = require('./webpack.config.common.js')
const webpack = require('webpack')

const isDev = process.env.NODE_ENV === 'development'

const config = webpackMerge(webpackConfigCommon, {
	entry: {
		app: path.join(__dirname, '../client/index-client.js')
	},
	output: {
		filename: '[name].[hash].js',

	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, '../client/template.html')
		}),
		// new HtmlWebpackPlugin({
		// 	template: '!!ejs-compiled-loader!' + path.join(__dirname, '../client/server-template.ejs'),
		// 	filename: 'server.ejs'
		// })
	]
})

if (isDev) {
	config.devtool = '#cheap-module-eval-source-map'
	config.entry = {
		app: [
			'react-hot-loader/patch',
			path.join(__dirname, "../client/index-client.js")
		]
	}
	config.devServer = {
		host: '0.0.0.0',
		port: '8888',
		hot: true,
		overlay: {
			errors: true
		},
		publicPath: '/public',
		historyApiFallback: {
			index: '/public/index.html'
		},
		proxy: {
			'/api': 'http://localhost:3333'
		}
	}
	config.plugins.push(new webpack.HotModuleReplacementPlugin())
} else {
	//开发之外需要对打包进行的优化
}

module.exports = config
