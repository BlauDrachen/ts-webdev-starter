import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OfflinePlugin from 'offline-plugin';

// tslint:disable:object-literal-sort-keys

export default {
  devtool: 'source-map',

  entry: {
    main: path.resolve(__dirname, 'src/index'),
    vendor: path.resolve(__dirname, 'src/vendor')
  },

  mode: 'production',

  module: {
    rules: [
      {test: /\.[jt]sx?$/, exclude: /node_modules/, use: 'awesome-typescript-loader'}, // scripts
      {test: /\.(sa|sc|c)ss$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']}, // stylesheets
      {test: /\.(jpe?g|png|gif|svg|ico)$/, use: 'file-loader?name=[name].[ext]'}, // Query string retains original name
      {test: /\.(woff2?|eot|ttf|otf)$/, use: 'file-loader'} // Fonts
    ]
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js',
    chunkFilename: 'name.[chunkhash].js'
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'all',
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
        }
      }
    },
    minimizer: [
      new OfflinePlugin({
        caches: 'all',
        AppCache: false,
        ServiceWorker: {
          minify: false,
        },
      }),
    ]
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: false,
      minimize: true,
      noInfo: true // set to false to see a list of every file being bundled.
    }),

    // Generate an external css file with a hash in the filename
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].cass'
    }),

    // Hash the files using MD5 so that their names change when the content changes.
    new WebpackMd5Hash(),

    // Use CommonsChunkPlugin to create a separate bundle
    // of vendor libraries so that they're cached separately.
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor'
    // }),

    // Create HTML file that includes reference to bundled JS.
    new HtmlWebpackPlugin({
      inject: true,
      minify: {
        collapseWhitespace: true,
        keepClosingSlash: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      },
      template: 'src/index.html',
      favicon: 'src/images/favicon.ico'
    }),

    // Eliminate duplicate packages when generating bundle
    // new webpack.optimize.DedupePlugin(),

    // Minify JS
    // new webpack.optimize.UglifyJsPlugin()
  ],

  resolve: {
    extensions: ['*', '.js', '.jsx', '.json', '.ts', '.tsx']
  },

  target: 'web'
};
