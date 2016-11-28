const path = require('path');

module.exports = {
	entry:{
		app: __dirname + '/src/index.js',
	},
	output: {
		path: __dirname + '/build',
		filename: '[name]-dev.js',
		publicPath:  './build/'
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
	plugins: [ ],
	devServer: {
		host: 'localhost',
		inline: true,
		port: 8000,
		contentBase: '.'
	}
};
