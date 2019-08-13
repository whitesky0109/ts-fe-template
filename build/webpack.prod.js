const path = require('path');

const baseWebpackConfig = require('./webpack.base');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

var conf = baseWebpackConfig;
conf = Object.assign(conf, {
    mode: "production",
    optimization: {
        minimizer: [
            new TerserPlugin({
                cache: false,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin({}),
        ],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                enforce: 'pre',
                exclude: /node_modules/,
                use: {
                    loader: 'tslint-loader',
                    options: {
                        emitErrors: true,
                        typeCheck: false,
                    }
                },
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true
                    },
                },
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                }
            },
            require('./sass.rule.js')({
                sourceMap: false, preserveUrl: false
            }),
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),

        new MiniCssExtractPlugin({
            filename: "index.css"
        }),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, '../views/user.html'),
            template: path.resolve(__dirname, '../src/user.template.html'),
            inject: 'body',
        }),
    ],
});

module.exports = conf;