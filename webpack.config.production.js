/**
 * Webpack configurations for production environment.
 */
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const pathsToClean = [
    'dist/*'
];

const cleanOptions = {
    verbose: true
};

const pluginOptions = {
    'process.env': {
        'NODE_ENV': JSON.stringify('production')
    }
};

const uglifyJsOptions = {
    compressor: {
        warnings: false
    }
};

const optimizeCssOptions = {
    cssProcessor: require('cssnano'),
    cssProcessorOptions: {
        discardComments: {
            removeAll: true
        }
    }
};

const extractOptions = {
    filename: 'index.css',
    allChunks: true
};

const config = {
    devtool: 'source-map',

    entry: ['./src/Main.jsx'],

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index.js',
        publicPath: '/dist/'
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
        new CleanWebpackPlugin(pathsToClean, cleanOptions),
        new webpack.DefinePlugin(pluginOptions),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new ExtractTextPlugin(extractOptions),
        new webpack.optimize.UglifyJsPlugin(uglifyJsOptions),
        new OptimizeCssAssetsPlugin(optimizeCssOptions)
    ]
};

module.exports = config;
