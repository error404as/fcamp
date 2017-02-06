const webpack = require('webpack');

module.exports = {
    entry: {
    	front: './src/front/index.js',
        vendor: ['react', 'react-dom', 'react-router', 'redux', 'moment']
    },
    output: {path: './public/js', filename: '[name].build.js', publicPath:  './js/'},
    module: {
        loaders: [
            {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/, query: { presets: ['latest','react'] }}
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "front.vendor.js",
        }),

        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify('production')
          }
        }),
        new webpack.optimize.UglifyJsPlugin({ exclude: /\.build\.js$/ })
    ]
};
