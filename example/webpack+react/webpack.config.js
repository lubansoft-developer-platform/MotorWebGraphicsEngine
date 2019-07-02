const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const production = process.env.NODE_ENV === 'production' || false;
const CleanWebpackPlugin = require('clean-webpack-plugin');
//motor在源码库中的位置
const motorSource = '../library';
//打包后motor静态资源存放的位置
const motorDist = 'motor';

module.exports = {
    entry: './index.js',
    output: {
        filename: production ? 'app.min.js' : 'app.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new CopyWebpackPlugin([{ from: path.join(motorSource, 'Workers'), to: path.join(motorDist, 'Workers') }]),
        new CopyWebpackPlugin([{ from: path.join(motorSource, 'images'), to: path.join(motorDist, 'images') }]),
        new CopyWebpackPlugin([{ from: path.join(motorSource, 'environmentMap'), to: path.join(motorDist, 'environmentMap') }]),
        new CopyWebpackPlugin([{ from: path.join(motorSource, 'Assets'), to: path.join(motorDist, 'Assets') }]),
        new CopyWebpackPlugin([{ from: path.join(motorSource, 'Widgets'), to: path.join(motorDist, 'Widgets')}]),
        new CopyWebpackPlugin([{ from: path.join(motorSource, 'ThirdParty'), to: path.join(motorDist, 'ThirdParty') }]),
        new CopyWebpackPlugin([{ from: path.join(motorSource, 'wasm'), to: path.join(motorDist, 'wasm') }]),
        new webpack.DefinePlugin({
            MOTOR_BASE_URL: JSON.stringify(motorDist)
        }),
    ]
};
