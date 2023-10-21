module.exports = {
    printWidth: 80,
    tabWidth: 4,
    trailingComma: 'all',
    singleQuote: true,
    semi: true,
    plugins: [require.resolve('@trivago/prettier-plugin-sort-imports')],
    importOrder: [
        '^react(.*)',
        'antd/(.*)',
        '<THIRD_PARTY_MODULES>',
        '@/(.*)',
        '^[./]',
    ],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,
    importOrderCaseInsensitive: true,
};
