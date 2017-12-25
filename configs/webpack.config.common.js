const path = require('path')
const autoprefixer = require('autoprefixer');

module.exports = {
	output: {
		path: path.join(__dirname, "../build"),
		publicPath: '/public/'
	},
	resolve: {
		extensions: ['.js','.jsx']
	},
	module: {
		rules: [
			{
				enforce: "pre",
				test: /\.(js|jsx)$/,
				loader: 'eslint-loader',
				exclude: [
					[path.join(__dirname, "../node_modules")]
				]
			},
			{
				test: /\.jsx$/,
				loader: "babel-loader"
			},
			{
				test: /\.js$/,
				loader: "babel-loader",
				exclude: [
					path.join(__dirname, "../node_modules")
				]
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: "file-loader",
				options: {
					name: '[name].[ext]?[hash]'
				}
			},
      {
        test: /\.css$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
        ],
      },
		]
	},
}
