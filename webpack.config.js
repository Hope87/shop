const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
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
      index: './src/js/index.js',
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
   // optimization: {
   //    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
   //    splitChunks: {
   //       cacheGroups: {
   //          styles: {
   //             name: 'style',
   //             test: /\.css$/,
   //             chunks: 'all',
   //             enforce: true,
   //          },
   //       },
   //    }
   // },
   plugins: [
      ...['index', 'about_us', 'orders', 'catering', 'find_us', 'products', 'basket'].map((event) => {
         return new HtmlWebpackPlugin({
            template: `./src/html/${event}.html`,
            filename: `${event}.htm`,
            chunks: [event],
            path: path.resolve(__dirname, 'dist'),
            // minify: {
            //    html5                          : true,
            //    collapseWhitespace             : true,
            //    minifyCSS                      : true,
            //    minifyJS                       : true,
            //    minifyURLs                     : false,
            //    removeAttributeQuotes          : true,
            //    removeComments                 : true, // false for Vue SSR to find app placeholder
            //    removeEmptyAttributes          : true,
            //    removeOptionalTags             : true,
            //    removeRedundantAttributes      : true,
            //    removeScriptTypeAttributes     : true,
            //    removeStyleLinkTypeAttributese : true,
            //    useShortDoctype                : true
            // },
         })
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
      new MiniCssExtractPlugin(
          {
             filename: "css/[name].css",
             chunkFilename: "css/[id].css",
          }),
   ],
   resolve: { extensions: ["*", ".js", ".jsx"] },
   module: {
      rules: [
         {
            test:/\.(s*)css$/,
            use: [
               MiniCssExtractPlugin.loader,
               { loader: 'css-loader?url=false'},
               { loader: 'sass-loader', options: { sourceMap: true } }
            ],
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
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: [
               {
                  loader: 'image-webpack-loader',
                  options: {
                     mozjpeg: {
                        progressive: true,
                        quality: 65
                     },

                     optipng: {
                        enabled: false,
                     },
                     pngquant: {
                        quality: [0.65, 0.90],
                        speed: 4
                     },
                     gifsicle: {
                        interlaced: false,
                     },

                     webp: {
                        quality: 75
                     },
                  }
               },
               {
                  loader: 'file-loader',
                  options:{
                     name: '[name].[ext]',
                     outputPath: 'images/',
                     publicPath: 'images/'
                  }
               },
               'url-loader?limit=100000'
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

      ],
   },
};
