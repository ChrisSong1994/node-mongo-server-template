module.exports = {
    env: {
        node: true,
        es6: true,
    },
    extends: [
        'airbnb-base',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'prettier/@typescript-eslint',
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint'],
    settings: {
        'import/resolver': {
            node: {
                // import 模块时，不写后缀将尝试导入的后缀，出现频率高的文件类型放前面
                extensions: ['.tsx', '.ts', '.js', '.json'],
            }
        },
    },
    rules: {},
};
