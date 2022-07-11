module.exports = {
    presets: ['module:metro-react-native-babel-preset', '@babel/preset-react', '@babel/preset-typescript'],
    plugins: [
        '@babel/plugin-proposal-optional-chaining',
        [
            'module-resolver',
            {
                root: ['./src'],
                alias: {
                    app: './src',
                    assets: './assets',
                    e2e: './e2e',
                },
            },
        ],
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        'react-native-reanimated/plugin',
    ],
    env: {
        test: {
            presets: [['@babel/preset-env'], 'jest', 'module:metro-react-native-babel-preset', '@babel/preset-react'],
            plugins: [
                '@babel/plugin-transform-runtime',
                ['@babel/plugin-proposal-decorators', { legacy: true }],
                '@babel/plugin-proposal-class-properties',
            ],
        },
    },
};
