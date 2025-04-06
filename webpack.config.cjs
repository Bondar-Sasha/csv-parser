const path = require('node:path')
const webpack = require('webpack')

module.exports = {
  entry: './src/index.cjs',
  externals: {
    commander: 'commonjs commander',
  },
  output: {
    filename: 'index.cjs',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  mode: 'production',
  target: 'node',
  resolve: {
    extensions: ['.cjs'],
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
  plugins: [
    new webpack.BannerPlugin({banner: '#!/usr/bin/env node', raw: true}),
  ],
}
