const ESLintPlugin = require('eslint-webpack-plugin');
const path = require('path')
module.exports = {
  mode: 'production',
  plugins: [new ESLintPlugin({
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  })],
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
      use: [
        // Creates `style` nodes from JS strings
        "style-loader",
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
        // Compiles Sass to CSS
        {
          loader: "sass-loader",
          options: {
            additionalData: `
                        @import "~@src/scss-vars.scss";
                        `,
            sassOptions: {
              includePaths: [__dirname]
            },
            
          }
        },
      ],
    },]
  }
  
}