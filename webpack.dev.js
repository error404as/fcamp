
module.exports = {
	entry:{
		app: __dirname + '/src/index.js',
	},
	output: {
		path: __dirname + '/build',
		filename: '[name]-dev.js',
		publicPath:  './build/'
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
		port: 8000,
		contentBase: '.'
	}
};
