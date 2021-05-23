const ESLintPlugin = require('eslint-webpack-plugin');
const path = require('path')
module.exports = {
    mode: 'production',
    plugins: [new ESLintPlugin({
        extensions:['.js','.jsx','.ts','.tsx']
    })],
    resolve:{
        alias:{
            '@src':path.resolve(__dirname,'./src')
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
        },{
            test: /\.s[ac]ss$/i,
            use: [
                // Creates `style` nodes from JS strings
                "style-loader",
                // Translates CSS into CommonJS
                "css-loader",
                // Compiles Sass to CSS
                {
                    loader:"sass-loader",
                    options:{
                        additionalData:`
                        @import "~@src/scss-vars.scss";
                        `,
                        sassOptions:{
                            includePaths:[__dirname]
                        }
                    }
                },
            ],
        },]
    }

}