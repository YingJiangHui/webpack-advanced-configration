// [0]不提示，[1]警告，[2]报错
module.exports = {
    extends: ['react-app'],
    rules: {
        'react/jsx-uses-react': [2],
        'react/react-in-jsx-scope': [2],
        'max-len': 'off' // disables line length check
    },
    overrides: [{
        files: ['*.ts', '*.tsx'],
        parserOptions: {
            project: './tsconfig.json'
        },
        extends: ['airbnb-typescript'],
        rules: {
            '@typescript-eslint/object-curly-spacing': [0],
            'import/prefer-default-export': [0],
            'no-console': [0],
            'max-len': 'off', // disables line length check
            '@typescript-eslint/comma-dangle':'off'
        }
    }]
}