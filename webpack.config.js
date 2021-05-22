const ESLintPlugin = require('eslint-webpack-plugin');
module.exports = {
    mode: 'production',
    plugins: [new ESLintPlugin({
        extensions:['.js','.jsx','.ts','.tsx']
    })],
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
        }]
    }

}