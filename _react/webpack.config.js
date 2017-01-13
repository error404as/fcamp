module.exports = {
    entry: './components/basic.jsx',
    output: {path: 'js', filename: 'build.js'},
    module: {
        loaders: [
            {test: /\.(js|jsx)$/, loader: 'babel-loader', exclude: /node_modules/, query: { presets: ['react'] }}
        ]
    }
};
