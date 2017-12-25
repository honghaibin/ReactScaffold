const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const webpackConfigCommon = require('./webpack.config.common.js')

const config = webpackMerge(webpackConfigCommon, {
	target: 'node',
	entry: {
		app: path.join(__dirname, '../client/index-server.js')
	},
	//指定某些包不打包到指定输出的js里面
	externals: Object.keys(require('../package.json').dependencies),
	output: {
		filename: 'index-server.js',
		libraryTarget: 'commonjs2'
	}
})

module.exports = config