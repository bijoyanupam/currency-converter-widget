const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
    entry: ['./src/main.jsx', './src/stylesheets/main.scss'],

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
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin({
            filename: 'index.css',
            allChunks: true,
        }),
    ]
}

module.exports = config;
