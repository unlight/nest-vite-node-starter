/**
 * @param  { import('webpack').Configuration } config
 * @param  { import('webpack') } webpack
 */
module.exports = (config, webpack) => {
    config.devtool = 'source-map';
    config.optimization.nodeEnv = 'production';
    config.optimization.moduleIds = 'named';
    config.optimization.chunkIds = 'named';
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
        test: require.resolve('./src/main.ts'),
        loader: 'condition-loader',
        options: {
            PROD: config.optimization.nodeEnv === 'production',
        },
    });

    config.output.iife = false;

    return config;
};
