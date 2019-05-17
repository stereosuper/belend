const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const config = (env, options) => {
    const MODE = options.mode;
    return {
        entry: './wp-content/themes/belend/src/js/main.js',
        output: {
            path: path.resolve(__dirname),
            filename: './wp-content/themes/belend/js/main.js',
            publicPath: '/wp-content/themes/belend/js',
        },
        devtool: '',
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                },
                {
                    test: /\.(css|sass|scss)$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                sourceMap: true,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => [
                                    autoprefixer({
                                        browsers: ['last 2 versions'],
                                    }),
                                ],
                            },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                            },
                        },
                    ],
                },
                {
                    test: /\.(png|jpg|gif|svg|ttf|otf|woff|woff2)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                publicPath: '/',
                                name: '[path][name].[ext]',
                                emitFile: false,
                            },
                        },
                    ],
                },
            ],
        },
        node: {
            fs: 'empty', // avoids error messages
        },
        optimization: {
            minimizer: [
                new TerserJSPlugin({}),
                new OptimizeCSSAssetsPlugin({}),
            ],
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'wp-content/themes/belend/css/main.css',
            }),
        ],
    };
};

module.exports = config;
