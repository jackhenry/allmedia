const path = require('path');

module.exports = {
  entry: './dist/index.js',
  mode: 'development',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  module: {},
  plugins: [],
};
