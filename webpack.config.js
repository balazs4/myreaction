const {join} = require('path');

module.exports = {
    entry: join(__dirname, 'src', 'index.js'),
    output: {
        path: 'dist',
        filename: 'app.js'
    },
    resolve: {
        extension: ['', 'js']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            }
        ]
    }
}