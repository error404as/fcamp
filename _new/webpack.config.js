module.exports = {
    entry: './src/react-redux.js',
    output: {path: './public/js', filename: 'build.js', publicPath:  './js/'},
    module: {
        loaders: [
            {test: /\.(js|jsx)$/, loader: 'babel-loader', exclude: /node_modules/, query: { presets: ['latest','react'] }}
        ]
    }
};
