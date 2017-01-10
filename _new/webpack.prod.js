const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	entry:{
		app: __dirname + '/src/index.js',
	},
	output: {
		path: __dirname + '/public/build',
		filename: '[name].js',
		publicPath:  './build/'
	},
	// https://github.com/webpack/webpack/issues/903
	resolveLoader: {
		fallback: [
			path.resolve(__dirname, 'webpack-loaders'),
			path.join(process.cwd(), 'node_modules')
		]
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel',
				query: {
					presets: ['es2015']
				}
			},
			{
				test: /\.json$/,
				loader: 'json!newsNames'
			},
			{
				test: /\.(png|jpg)$/,
				loader: 'url?limit=20000'
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
		}),
		new CleanWebpackPlugin(['public/build'], {
			verbose: true
		})
	],
	devServer: {
		host: 'localhost',
		port: 8000,
		contentBase: '.'
	}
};
