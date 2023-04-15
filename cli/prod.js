/** @format */

const path = require('path');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const webpackBaseConfig = require('./base');
const { merge } = require('webpack-merge');

const { name, version } = require('../package.json');

console.info('process.env.NODE_ENV', process.env.NODE_ENV);

module.exports = merge(webpackBaseConfig, {
  mode: 'production',
  entry: {
    app: path.resolve(__dirname, '../src/index.tsx'),
    vendors: ['react-router-dom', 'antd'], // 所引入的公共库
    shared: 'lodash',
    shared: 'react',
    shared: 'react-dom',
  },
  output: {
    // 对应于entry里面生成出来的文件名，
    // hash 标识，每次修改输出不同文件名，用于更新浏览器缓存文件，区分版本, 8 代表打包出来为 8位 字符串
    filename: 'js/[id].[contenthash:8].js',
    chunkFilename: 'js/[id]_chunk.[contenthash:8].js',
    publicPath: '/',
    crossOriginLoading: 'anonymous',
    path: path.resolve(__dirname, '../dist'), // 输出目录
    sourceMapFilename:
      process.env.NODE_ENV !== 'production' ? 'js/[name].[contenthash:8].js.map' : '',
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        parallel: true, // 开启多线程
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
    runtimeChunk: true,
    removeAvailableModules: true, // 删除已可用模块
    moduleIds: 'natural',
    chunkIds: 'natural',
    providedExports: true,
    splitChunks: {
      // 默认 entry 的 chunk 不会被拆分, 配置成 all, 就可以了拆分了，一个入口`JS`打包后就生成一个单独的文件
      chunks: 'all',
      minSize: 30000,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 指定生成的文件所依赖哪一个html文件模板，模板类型可以是html、jade、ejs等
      // template: './public/index.html',
      template: './index.ejs',
      filename: 'index.html',
      favicon: '',
      // 清除 html 一些没用的代码
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[id].[contenthash].css',
      chunkFilename: 'css/[id].[contenthash].css',
    }),
    // new BundleAnalyzerPlugin()
  ],
});
