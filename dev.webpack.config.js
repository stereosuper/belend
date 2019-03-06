const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const autoprefixer = require('autoprefixer');

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;
const URL = 'http://belend.local/';

const config = (env, options) => {
    const MODE = options.mode;
    return {
        cache: false,
        entry: './wp-content/themes/belend/src/js/main.js',
        output: {
            path: path.resolve(__dirname),
            filename: './wp-content/themes/belend/js/main.js',
            publicPath: '/wp-content/themes/belend/js',
        },
        watch: true,
        devtool: MODE === 'development' ? 'source-map' : '',
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    options: {
                        plugins: ['transform-inline-environment-variables'],
                    },
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
        plugins: [
            new MiniCssExtractPlugin({
                filename: './wp-content/themes/belend/css/main.css',
            }),
            new BrowserSyncPlugin({
                host: HOST,
                port: PORT,
                proxy: URL,
                files: [
                    {
                        match: ['**/*.php'],
                    },
                ],
            }),
        ],
    };
};

module.exports = config;
