const { join } = require('path');
const autoprefixer = require('autoprefixer');
const ManifestPlugin = require('webpack-manifest-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = ({ dev } = {}) => {
  const path = join(__dirname, dev ? 'out/dev' : 'out/prod');

  return {
    mode: dev ? 'development' : 'production',
    devtool: dev ? 'cheap-module-source-map' : 'nosources-source-map',
    entry: {
      main: './src/index.js',
      editor: './etc/editor/src/index.js',
    },
    output: {
      path,
      filename: `[name].js`,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.s?css$/,
          exclude: /node_modules/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [autoprefixer],
                sourceMap: true,
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
      ],
    },
    plugins: [
      new CleanWebpackPlugin(path),
      new ManifestPlugin(),
      new MiniCssExtractPlugin({
        filename: `[name].css`,
      }),
    ],
    optimization: {
      minimizer: [new UglifyJsPlugin()],
    },
  };
};
