const path = require('path');
const { name } = require('./package.json');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: process.env.NO_OPTIMIZATION ? `${name}.js` : `${name}.min.js`,
    library: 'withJS',
    libraryExport: 'default',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        loader: 'babel-loader'
      }
    ]
  },
  optimization: {
    minimize: !process.env.NO_OPTIMIZATION
  }
};
