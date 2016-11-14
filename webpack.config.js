const {join} = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = env => ({
    entry: {
        app: join(__dirname, 'src', 'index.js'),
        vendor: ['react', 'react-dom', 'redux', 'redux-observable', 'rxjs']
    },
    output: {
        path: join(__dirname, 'dist'),
        filename: '[name].[hash].js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity,
            filename: '[name].[hash].js'
        }),
        new HtmlWebpackPlugin({
            template: join(__dirname, 'src', 'index.html'),
            filename: 'index.html',
            inject: 'body'
        })
    ]
})

