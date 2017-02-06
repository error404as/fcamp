const webpack = require('webpack');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

module.exports = {
    entry: {
    	cms: './src/cms/app.module.js',
        vendor: ['angular', 'angular-route', 'angular-sanitize']
    },
    output: {path: './public/js', filename: '[name].build.js', publicPath:  './js/'},
    module: {
        loaders: [
            {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/, query: { presets: ['latest','react'] }},
            {test: /\.html$/, loader: 'raw-loader', exclude: /node_modules/ }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "cms.vendor.js",
        }),

        new ngAnnotatePlugin({ add:true }),
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify('production')
          }
        }),
        new webpack.optimize.UglifyJsPlugin({ exclude: /\.build\.js$/ })

    ]
};
