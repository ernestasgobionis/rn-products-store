module.exports = {
    printWidth: 120,
    tabWidth: 4,
    semi: true,
    singleQuote: true,
    trailingComma: 'all',
    arrowParens: 'always',
    useTabs: false,
    overrides: [
        {
            files: '*.md',
            options: {
                printWidth: 90,
                trailingComma: 'none',
                proseWrap: 'always',
            },
        },
        {
            files: '*.json',
            options: {
                tabWidth: 2,
                printWidth: 90,
                proseWrap: 'never',
            },
        },
    ],
};
