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
      {test: /\.[jt]sx?$/, exclude: /node_modules/, use: 'awesome-typescript-loader'}, // scripts
      {test: /\.(sa|sc|c)ss$/, use: ['style-loader', 'css-loader', 'sass-loader']}, // stylesheets
      {test: /\.(jpe?g|png|gif|svg|ico)$/, use: 'file-loader?name=[name].[ext]'}, // Query string retains original name
      {test: /\.(woff2?|eot|ttf|otf)$/, use: 'file-loader'} // Fonts
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

    // tslint:disable:object-literal-sort-keys
    // Create HTML file that includes reference to bundled JS.
    new HtmlWebpackPlugin({
      inject: true,
      template: 'src/index.html',
      favicon: 'src/images/favicon.ico'
    })
    // tslint:enable:object-literal-sort-keys
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json', '.ts', '.tsx']
  },
  target: 'web'
};
