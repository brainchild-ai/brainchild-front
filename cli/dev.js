/** @format */

const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpackBaseConfig = require('./base');
const { _port, _host } = require('../package.json');

module.exports = merge(webpackBaseConfig, {
  mode: 'development',
  // target: 'web',
  devtool: 'eval-source-map',
  output: {
    sourceMapFilename: 'js/[name].[contenthash:8].js.map', // 开发环境加入，便于查找问题
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshPlugin(),
  ],
  stats: 'errors-only',
  // 开发服务配置
  devServer: {
    port: _port,
    // host: _host | '127.0.0.1',
    static: {
      publicPath: '/',
      directory: path.join(__dirname, 'build'),
    },
    open: true,
    hot: true,
    client: {
      overlay: {
        errors: false,
        warnings: false,
      },
    },
    compress: true,
    historyApiFallback: true,
    // 代理请求，防止跨域，这里可以改动
    proxy: {
    },
  },
});
