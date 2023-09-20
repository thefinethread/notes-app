const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'production',
    entry: {
        index: './src/index.js',
    },
    output: {
        path: path.resolve(__dirname, '../backend/public/'),
        filename: 'bundle.js',
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, '../backend/public'),
        },
        port: 3001,
        hot: true,
        open: true,
        compress: true,
        historyApiFallback: true,
        proxy: {
            '/api': 'http://localhost:5000',
        },
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Notes App',
            filename: 'index.html',
            template: './src/index.html',
        }),
        new MiniCssExtractPlugin(),
    ],
};
