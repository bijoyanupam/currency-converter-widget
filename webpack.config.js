/**
 * Webpack configurations for development environment.
 */
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractOptions = {
    filename: 'index.css',
    allChunks: true
};

const config = {
    entry: ['./src/Main.jsx'],

    output: {
        path: '/',
        filename: 'index.js',
    },

    devServer: {
        inline: true,
        port: 8080
    },

    module: {
        loaders: [{
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',

                query: {
                    presets: ['env', 'react']
                }
            },
            {
                test: /\.(sass|scss)$/,
                loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
            },
            {
                test: /\.(jpg|jpeg|gif|png|ico|svg|xml|json)$/,
                exclude: /node_modules/,
                loader: 'file-loader?name=assets/[path][name].[ext]&context=./assets'
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin(extractOptions)
    ]
}

module.exports = config;
