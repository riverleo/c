const path = require('path');
const ManifestPlugin = require('webpack-manifest-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = ({ dev } = {}) => ({
  mode: dev ? 'development' : 'production',
  devtool: dev ? 'cheap-module-eval-source-map' : 'nosources-source-map',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'static', 'bundles'),
    filename: `bundle.${dev ? 'dev' : 'prod'}.[hash].js`,
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
    ],
  },
  plugins: [
    new ManifestPlugin({ publicPath: '/static/bundles/' }),
  ],
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
});
