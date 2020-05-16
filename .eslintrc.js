const OFF = 0;
const ERROR = 2;

module.exports = {
    env: {
        node: true,
        es6: true,
    },
    extends: [
        'airbnb-base',
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
                extensions: ['.ts', '.js', '.json'],
            },
        },
    },
    rules: {
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never',
            },
        ],
        'func-names': OFF,
        'global-require': OFF,
        'no-console': OFF,
        'no-param-reassign': OFF,
        'no-plusplus': OFF,
        'no-underscore-dangle': OFF,
        'no-unused-expressions': OFF,
        'no-unused-vars': OFF,
        camelcase: 'off',
        '@typescript-eslint/camelcase': OFF,
        "@typescript-eslint/explicit-function-return-type": OFF,
        "@typescript-eslint/no-explicit-any": OFF,
        "@typescript-eslint/no-non-null-assertion": OFF,
        '@typescript-eslint/no-inferrable-types':OFF,
        'prefer-promise-reject-errors':OFF,
        'spaced-comment':OFF,
        'class-methods-use-this':OFF,
        'new-cap':OFF,
        'prefer-template':OFF,
        'lines-between-class-members':OFF
    },
};
