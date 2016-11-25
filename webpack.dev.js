
module.exports = {
	entry:{
		app: __dirname + '/src/scripts.js',
	},
	output: {
		path: __dirname + '/js',
		filename: '[name]-dev.js',
		publicPath:  '/js/'
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
	plugins: [ ],
	devServer: {
		host: 'localhost',
		port: 8000,
		contentBase: '.'
	}
};
