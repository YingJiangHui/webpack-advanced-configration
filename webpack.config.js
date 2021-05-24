const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const cssLoaders = (loader) => {
  return [
    // Creates `style` nodes from JS strings
    MiniCssExtractPlugin.loader,
    // Translates CSS into CommonJS
    {
      loader: "css-loader",
      options: {
        modules: {
          //The module handles class and id scoping and @value values. The icss will only compile the low level Interoperable CSS format for declaring :import and :export dependencies between CSS and other languages.
          compileType: "module"
        }
      }
    },
    ...loader
  ]
}
module.exports = {
  mode: 'production',
  output: {
    filename: "[name].[contenthash].js"
  },
  optimization: {
    minimize: true,
    runtimeChunk: {
      name: 'runtime',
    },
    moduleIds: 'deterministic',
    splitChunks:{
      minSize: 0,
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          reuseExistingChunk: true,
          name:'vendor'
        },
        common: {
          minChunks:2,
          priority: 5,
          reuseExistingChunk: true,
          name:'common'
        },
      }
    }
  },
  entry:{
    main:'./src/index.js',
    admin:'./src/admin.js'
  },
  plugins: [
    new ESLintPlugin({
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  }),
    new MiniCssExtractPlugin({filename: "[name].[contenthash].css"}),
    new HtmlWebpackPlugin({filename: "index.html", chunks: ['main']}), new HtmlWebpackPlugin({filename:'admin.html',chunks:['admin']})],
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src')
    }
  },
  module: {
    rules: [{
      test: /\.[jt]sx$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react',
            '@babel/preset-typescript'
          ]
        }
      }
    }, {
      test: /\.s[ac]ss$/i,
      use: cssLoaders([{
        loader: "sass-loader",
        options: {
          additionalData: `
                        @import "~@src/scss-vars.scss";
                        `,
          sassOptions: {
            includePaths: [__dirname]
          },
          
        }
      }]),
    },
      {
        test: /\.less$/i,
        use: cssLoaders([{
          loader: "less-loader",
          options: {
            additionalData: `
                        @import "~@src/less-vars.less";
                        `,
          }
        }])
      },
      {
        test: /\.styl$/,
        use: cssLoaders([
          {
            loader: "stylus-loader",
            options: {
              stylusOptions: {
                import: [path.resolve(__dirname, 'src/stylus-vars.styl')]
              }
            }
          }])
      }
    ]
  }
  
}