import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  devtool: 'inline-source-map',
  entry: [
    path.resolve(__dirname, 'src/index')
  ],
  mode: 'development',
  module: {
    rules: [
      {test: /\.[jt]sx?$/, exclude: /node_modules/, use: 'awesome-typescript-loader'},
      {test: /\.(sa|sc|c)ss$/, use: ['style-loader', 'css-loader', 'sass-loader']}
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'src'),
    publicPath: '/'
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true,
      minimize: false,
      noInfo: true // set to false to see a list of every file being bundled.
    }),

    // Create HTML file that includes reference to bundled JS.
    new HtmlWebpackPlugin({
      inject: true,
      template: 'src/index.html'
    })
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json', '.ts', '.tsx']
  },
  target: 'web'
};
