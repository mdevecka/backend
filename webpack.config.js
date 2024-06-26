const path = require('path');
const tsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const mode = process.env.NODE_ENV || 'development';

module.exports = {
  entry: [
    './src/main.ts',
  ],
  optimization: {
    minimize: true,
  },
  target: 'node',
  mode,
  resolve: {
    plugins: [new tsconfigPathsPlugin()],
    extensions: ['.ts', '.js'],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.js',
    clean: true,
  },
};