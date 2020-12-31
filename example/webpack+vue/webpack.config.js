const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const production = process.env.NODE_ENV === 'production' || false;
const CleanWebpackPlugin = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

//motor在源码库中的位置
const motorSource = '../library';
//打包后motor静态资源存放的位置
const motorDist = 'motor';

module.exports = {
    context:__dirname,
    entry: './src/index.js',
    output: {
        filename: production ? 'app.min.js' : 'app.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                  'vue-style-loader',
                  'css-loader'
                ]
            }
        ]
    },
    resolve: {
        alias: {
            // motor: path.resolve(__dirname, motorSource+'/motor.js'),
            vue: 'vue/dist/vue.esm.js' // 用 webpack 1 时需用 'vue/dist/vue.common.js'
        }
    },
    plugins: [
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new CopyWebpackPlugin([{ from: motorSource, to: motorDist, ignore: '/*.js'}]),
        new CopyWebpackPlugin([{ from: './src/common/common.js', to: 'common' }]),
        new webpack.DefinePlugin({
            MOTOR_BASE_URL: JSON.stringify(motorDist)
        })
    ]
};
