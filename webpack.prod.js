const webpack = require('webpack');

module.exports = {
	entry:{
		app: __dirname + '/src/scripts.js',
	},
	output: {
		path: __dirname + '/js',
		filename: '[name].js',
		publicPath:  './js/'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.less$/,
				loader: 'style!css!less'
			}
		]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			},
			output: {
				comments: false
			}
		})
	],
	devServer: {
		host: 'localhost',
		port: 8000,
		contentBase: '.'
	}
};
