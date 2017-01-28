const webpack = require('webpack');

module.exports = {
    entry: {
    	refront: './src/react-redux.js',
    	angcms: './src/app.module.js' 
    },
    output: {path: './public/js', filename: '[name].build.js', publicPath:  './js/'},
    module: {
        loaders: [
            {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/, query: { presets: ['latest','react'] }},
            {test: /\.html$/, loader: 'raw-loader', exclude: /node_modules/ }
        ]
    }
};
