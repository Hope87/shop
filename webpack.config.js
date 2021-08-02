const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const miniCss = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'production' ? 'production' : 'development';
// const webpack = require('webpack');

module.exports = {
   mode: 'development',
   devServer: {
      historyApiFallback: true,
      contentBase: path.resolve(__dirname, './dist'),
      open: true,
      compress: true,
      hot: true,
      port: 8080,
   },
   entry: {
      main: './src/js/index.js',
      aboutUs: './src/js/aboutUs.js',
      orders: './src/js/orders.js',
      catering: './src/js/catering.js',
      find_us: './src/js/find_us.js',
      products: './src/js/products.js',
      basket: './src/js/basket.js',
   },
   output: {
      filename: 'js/[name].js',
      path: path.resolve(__dirname, 'dist'),
   },
   optimization: {
      minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
      splitChunks: {
         cacheGroups: {
            styles: {
               name: 'style',
               test: /\.css$/,
               chunks: 'all',
               enforce: true,
            },
         },
      }
   },
   plugins: [
      new HTMLWebpackPlugin({
         template: './src/html/index.html',
         filename: 'index.html',
         chunks: ['main'],
         path: path.resolve(__dirname, 'dist'),
      }),
      new HTMLWebpackPlugin({
         template: './src/html/about_us.html',
         filename: 'about_us.html',
         chunks: ['aboutUs'],
         path: path.resolve(__dirname, 'dist'),
      }),
      new HTMLWebpackPlugin({
         template: './src/html/orders.html',
         filename: 'orders.html',
         chunks: ['orders'],
         path: path.resolve(__dirname, 'dist'),
      }),
      new HTMLWebpackPlugin({
         template: './src/html/catering.html',
         filename: 'catering.html',
         chunks: ['catering'],
         path: path.resolve(__dirname, 'dist'),
      }),
      new HTMLWebpackPlugin({
         template: './src/html/find_us.html',
         filename: 'find_us.html',
         chunks: ['find_us'],
         path: path.resolve(__dirname, 'dist'),
      }),
      new HTMLWebpackPlugin({
         template: './src/html/products.html',
         filename: 'products.html',
         chunks: ['products'],
         path: path.resolve(__dirname, 'dist'),
      }),
      new HTMLWebpackPlugin({
         template: './src/html/basket.html',
         filename: 'basket.html',
         chunks: ['basket'],
         path: path.resolve(__dirname, 'dist'),
      }),
      new CleanWebpackPlugin(), // очищение папки

      new CopyWebpackPlugin({
         patterns: [
            {
               from: path.resolve(__dirname, './src/img'),
               to: path.resolve(__dirname, 'dist/img'),
            },
            {
               from: path.resolve(__dirname, 'src/fonts'),
               to: path.resolve(__dirname, 'dist/fonts'),
               noErrorOnMissing: true,
            }
         ],
      }),
      new miniCss({
         filename: "css/[name].css",
         chunkFilename: "css/[id].css",
      }),
   ],
   module: {
      rules: [
         {
            test:/\.(s*)css$/,
            use: [
               miniCss.loader,
               'css-loader',
               'sass-loader',
            ]
         },
         {
            test: /\.(ttf|woff|woff2|eot|otf)$/,
            use: [
               {
                  loader: 'file-loader',
                  options: {
                     name: '[name].[ext]',
                     outputPath: 'fonts/',
                  },
               },
            ],
         },
         {
            test: /\.(png|jpe?g|gif|svg|base64)$/,
            use: [
               {
                  loader: 'file-loader',
                  options: {
                     name: '[folder]/[name].[ext]',
                  },
               },
            ],
         },
         {
            test: /\.(mov|mp4)$/,
            use: [
               {
                  loader: 'file-loader',
                  options: {
                     name: '[name].[ext]',
                  },
               },
            ],
         },
         {test: /node_modules\/flickity/, loader: 'imports?define=>undefined'},
      ],
   },
};
