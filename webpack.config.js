const path = require('path');
const autoprefixer = require('autoprefixer');
const ManifestPlugin = require('webpack-manifest-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = ({ dev } = {}) => ({
  mode: dev ? 'development' : 'production',
  devtool: dev ? 'cheap-module-eval-source-map' : 'nosources-source-map',
  entry: {
    main: './src/index.js',
    edit: './etc/edit/src/index.js',
  },
  output: {
    path: path.join(__dirname, 'etc', 'dist'),
    filename: `[name].${dev ? 'dev' : 'prod'}.[hash].js`,
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
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [autoprefixer],
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin('etc/dist'),
    new ManifestPlugin(),
    new MiniCssExtractPlugin({
      filename: `[name].${dev ? 'dev' : 'prod'}.[hash].css`,
    }),
  ],
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
});
