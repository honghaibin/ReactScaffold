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
  // 把公共的代码单独打包，这样浏览器就不会每次都加载这些包了
  config.entry = {
    app: path.join(__dirname, '../client/index-client.js'),
    vendor: [
      'react',
      'react-dom',
      'react-router-dom',
      'redux',
      'react-redux',
      'axios',
      'echarts'
    ]
  }
  // 设置hash值为模块的hash值，而不是所有打包文件的hash值
  config.output.filename = '[name].[chunkhash].js';
  // 1.压缩代码 2.指定vendor里面打包的代码不再打包到app....js里面
  // 3.webpack每次都会自动生成一些东西从而导致vendor每次都不一样，所以需要配置
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.NamedChunksPlugin((chunk) => {
      if (chunk.name) {
        return chunk.name;
      }
      return chunk.mapModules(m => path.relative(m.context, m.request)).join('_')
    })
  )
}

module.exports = config
