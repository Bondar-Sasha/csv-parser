const path = require('node:path')
const nodeExternals = require('webpack-node-externals')
const webpack = require('webpack')

module.exports = {
  entry: './src/index.cjs',
  output: {
    filename: 'index.cjs',
    path: path.resolve(process.cwd(), 'dist'),
    clean: true,
  },
  mode: 'production',
  resolve: {
    extensions: ['.cjs'],
    fallback: {
      fs: false,
      path: require.resolve('path-browserify'),
      stream: require.resolve('stream-browserify'),
      events: require.resolve('events'),
      child_process: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.cjs$/,
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
  externals: [nodeExternals()],
  plugins: [
    new webpack.BannerPlugin({banner: '#!/usr/bin/env node', raw: true}),
  ],
}
