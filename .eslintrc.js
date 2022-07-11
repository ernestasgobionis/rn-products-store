module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    extends: [
        'airbnb',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/typescript',
        'plugin:react/recommended',
        'plugin:prettier/recommended',
        'prettier/react',
        '@react-native-community',
    ],
    plugins: ['@typescript-eslint', 'import', 'react-hooks', 'jest', 'prettier', 'react', 'react-native'],
    rules: {
        'prettier/prettier': 'error',
        'react/require-default-props': 'off',
        'react-native/no-unused-styles': 2,
        'react-native/no-inline-styles': 1,
        'react-native/no-single-element-style-arrays': 2,
        'react-native/no-raw-text': 0,
        'no-undef': 'error',
        'no-useless-constructor': 'off',
        'no-console': 'error',
        'no-restricted-syntax': 'off',
        'no-async-promise-executor': 'off',
        'class-methods-use-this': 'off',
        'import/named': 'off',
        'import/export': 'off',
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
        'import/prefer-default-export': 'off',
        'import/no-extraneous-dependencies': [
            'error',
            { devDependencies: true, optionalDependencies: false, peerDependencies: false },
        ],
        'import/no-cycle': 'off',
        'import/order': [
            'error',
            {
                'newlines-between': 'always',
                groups: [['builtin', 'external'], ['internal', 'sibling', 'parent', 'index'], 'unknown'],
            },
        ],
        'import/no-named-as-default': 0,
        'no-unused-expressions': [
            'warn',
            {
                allowShortCircuit: true,
                allowTernary: true,
            },
        ],
        'newline-before-return': 'error',
        'max-classes-per-file': ['error', 2],
        'react/jsx-props-no-spreading': 'off',
        'lines-around-directive': [
            'error',
            {
                before: 'never',
                after: 'always',
            },
        ],
        'lines-between-class-members': 'off',
        '@typescript-eslint/prefer-interface': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/indent': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-member-accessibility': 'off',
        '@typescript-eslint/no-empty-interface': 'warn',
        '@typescript-eslint/ban-ts-comment': 'warn',
        '@typescript-eslint/camelcase': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'react/state-in-constructor': 'off',
        'react/jsx-fragments': 'off',
        'react/jsx-filename-extension': [
            'warn',
            {
                extensions: ['.jsx', '.tsx'],
            },
        ],
        'react/no-array-index-key': 'warn',
        'react/jsx-no-bind': 'warn',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'off',
        'react/sort-comp': [
            'warn',
            {
                order: [
                    'static-variables',
                    'instance-variables',
                    'getters',
                    'setters',
                    'constructor',
                    'static-methods',
                    'instance-methods',
                    'lifecycle',
                    '/^on.+$/',
                    '/^handle.+$/',
                    'everything-else',
                    '/^render.+$/',
                    'render',
                ],
            },
        ],
        'react/static-property-placement': 'off',
        'react/destructuring-assignment': 0,
        'react/prefer-stateless-function': 0,
        'jsx-a11y/label-has-associated-control': [
            'error',
            {
                assert: 'either',
            },
        ],
        'jsx-a11y/anchor-is-valid': 'off',
        'jsx-a11y/label-has-for': [
            2,
            {
                components: ['Label'],
                required: {
                    every: ['nesting', 'id'],
                },
                allowChildren: true,
            },
        ],
        'padding-line-between-statements': [
            'error',
            {
                blankLine: 'always',
                prev: ['const', 'let', 'var'],
                next: '*',
            },
            {
                blankLine: 'any',
                prev: ['const', 'let', 'var'],
                next: ['const', 'let', 'var'],
            },
            {
                blankLine: 'always',
                prev: '*',
                next: ['class', 'return', 'export'],
            },
        ],
        'no-prototype-builtins': 'off',
        'prefer-destructuring': [
            'warn',
            {
                array: false,
                object: true,
            },
        ],
    },
    env: {
        browser: true,
        jest: true,
        node: true,
        jasmine: true,
    },
    globals: {
        device: false,
        expect: false,
        waitFor: false,
        element: false,
        by: false,
    },
    settings: {
        parser: 'typescript-eslint-parser',
        rules: {
            'import/no-unresolved': 'error',
        },
        react: {
            version: 'detect',
        },
        'import/resolver': {
            typescript: {},
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
                moduleDirectory: ['node_modules', 'src/'],
            },
        },
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        optionalChaining: true,
        ecmaFeatures: {
            jsx: true,
        },
    },
};
