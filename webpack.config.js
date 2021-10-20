/**
 * @param  { import('webpack').Configuration } config
 * @param  { import('webpack') } webpack
 */
module.exports = (config, webpack) => {
    config.devtool = 'source-map';
    config.plugins = config.plugins.filter(p => {
        const pluginName = p?.constructor?.name;
        if (
            config.watch &&
            pluginName === 'ForkTsCheckerWebpackPlugin' &&
            process.env.WORKSPACE_NO_TS_CHECK
        ) {
            return false;
        }
        return true;
    });

    config.module.rules.unshift({
        test: /main\.ts$/,
        loader: 'condition-loader',
        options: {
            PROD: process.env.NODE_ENV === 'production',
        },
    });

    config.plugins.push(
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
    );

    return config;
};
