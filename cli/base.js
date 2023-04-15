/** @format */

const path = require('path');
const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const WebpackBar = require('webpackbar');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const defaultTheme = require('../src/theme/index');

const getLessLoaderOption = function ({ cssModules = false }) {
  const lessLoaderOption = [
    {
      loader:
        process.env.NODE_ENV !== 'development'
          ? MiniCssExtractPlugin.loader
          : 'style-loader',
    },
    {
      loader: 'css-loader',
      options: {
        modules: cssModules
          ? {
              mode: 'local',
              localIdentName: '[local]--[hash:base64:5]',
            }
          : false,
      },
    },
    {
      loader: 'postcss-loader',
    },
    {
      loader: 'less-loader',
      options: {
        lessOptions: {
          javascriptEnabled: true,
          // modifyVars: defaultTheme,
        },
        // This is especially useful when some of your Less variables depend on the environment
        // additionalData: `@env: ${process.env.NODE_ENV}; @primary-color: #29b6b0;`
      },
    },
  ];
  return lessLoaderOption;
};

module.exports = {
  entry: {
    app: path.resolve(__dirname, '../src/index.tsx'),
  },
  output: {
    path: path.join(__dirname, '../build'),
    publicPath: '/',
    filename: 'js/[id].[hash:8].js',
    chunkFilename: 'js/[id]_chunk.[hash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.ts[x]?$/,
        loader: 'babel-loader',
        exclude: /node_modules\/(?!(dom7|ssr-window|swiper|tapable)\/).*/,
        options: {
          cacheDirectory: true,
          plugins: [
            process.env.NODE_ENV === 'development' &&
              require.resolve('react-refresh/babel'),
          ].filter(Boolean),
        },
        include: /src/,
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
      // .less 不处理
      {
        test: /\.(less)$/,
        exclude: /\.module\.(less)$/,
        use: getLessLoaderOption({
          cssModules: false,
        }),
      },
      {
        test: /\.module\.(less)$/,
        exclude: path.resolve(__dirname, '../node_modules'),
        use: getLessLoaderOption({
          cssModules: true,
        }),
      },
      {
        test: /\.(png|gif|svg|jpe?g)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024,
          },
        },
        generator: {
          filename: 'image/[name][ext]',
        },
      },
      {
        test: /\.(eot|ttf|woff|woff2|otf|gif)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024,
          },
        },
        generator: {
          filename: 'fonts/[name][ext]',
        },
      },
      {
        test: /\.ejs$/,
        loader: 'ejs-loader',
        options: {
          esModule: false,
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    // 强制执行所有必须模块的整个路径，匹配磁盘上实际路径的确切大小写, 避免大小写问题引起的麻烦
    new CaseSensitivePathsPlugin(),
    new AntdDayjsWebpackPlugin(),
    // 进度条插件
    new WebpackBar(),
    new webpack.ProvidePlugin({
      process: 'process/browser.js',
      Buffer: ['buffer', 'Buffer'],
    }),
    // html插件
    new HtmlWebpackPlugin({
      // template: './public/index.html',
      template: './index.ejs',
      filename: 'index.html',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src/'),
      '@assets': path.resolve(__dirname, '../src/assets/'),
      '@common': path.resolve(__dirname, '../src/common/'),
      '@components': path.resolve(__dirname, '../src/components/'),
      '@hooks': path.resolve(__dirname, '../src/hooks/'),
      '@models': path.resolve(__dirname, '../src/models/'),
      '@pages': path.resolve(__dirname, '../src/pages/'),
      '@service': path.resolve(__dirname, '../src/service/'),
      '@shared': path.resolve(__dirname, '../src/shared/'),
      '@store': path.resolve(__dirname, '../src/store'),
      '@typings': path.resolve(__dirname, '../src/typings'),
      react: path.resolve('./node_modules/react'),
    },
    fallback: {
      util: require.resolve('util'),
      stream: require.resolve('stream-browserify'),
      zlib: require.resolve('browserify-zlib'),
      buffer: require.resolve('buffer'),
      path: require.resolve('path-browserify'),
      asset: require.resolve('assert'),
      url: require.resolve('url'),
      process: require.resolve('process'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.less'],
  },
  performance: {
    maxEntrypointSize: 1000000,
    maxAssetSize: 300000,
    assetFilter: function (assetFilename) {
      return assetFilename.endsWith('.js');
    },
  },
};
