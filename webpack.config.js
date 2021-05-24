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
  },
  plugins: [
    new ESLintPlugin({
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  }),
    new MiniCssExtractPlugin({filename: "[name].[contenthash].css"}),
    new HtmlWebpackPlugin()],
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