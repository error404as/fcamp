const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	entry:{
		app: __dirname + '/src/index.js',
	},
	output: {
		path: __dirname + '/build-dev',
		filename: '[name].js',
		publicPath:  './build-dev/'
	},
	// https://github.com/webpack/webpack/issues/903
	resolveLoader: {
		fallback: [
			path.resolve(__dirname, 'loaders'),
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
				loader: 'url?limit=100000'
			},
			{
				test: /\.less$/,
				loader: 'style!css!less'
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(['build-dev'], {
			verbose: true
		})
	],
	devServer: {
		host: 'localhost',
		inline: true,
		port: 8000,
		contentBase: '.'
	}
};
