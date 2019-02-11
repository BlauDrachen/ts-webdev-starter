import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: [
    path.resolve(__dirname, 'src/index')
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'awesome-typescript-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: false,
      debug: true,
      noInfo: true // set to false to see a list of every file being bundled.
    }),
    // Create HTML file that includes reference to bundled JS.
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: true
    })
  ],
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'src'),
    publicPath: '/',
    filename: 'bundle.js'
  }
};