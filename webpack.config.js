const { envBool } = require('env-bool');

const hasWatchFlag =
    process.argv[1]?.endsWith('nest.js') && process.argv.includes('--watch');

/**
 * @param  { import('webpack').Configuration } config
 * @param  { import('webpack') } webpack
 */
module.exports = (config, webpack) => {
    const isWatch = config.watch || hasWatchFlag;
    const disableTsCheck = envBool(process.env.WORKSPACE_NO_TS_CHECK);

    Object.assign(config, {
        devtool: 'source-map',
        mode: 'production',
    });

    Object.assign(config.optimization, {
        nodeEnv: 'production',
        minimize: false,
        moduleIds: 'named',
        chunkIds: 'named',
    });

    Object.assign(config.output, {
        iife: false,
    });

    config.plugins = config.plugins.filter(p => {
        const pluginName = p?.constructor?.name;
        if (isWatch && pluginName === 'ForkTsCheckerWebpackPlugin' && disableTsCheck) {
            return false;
        }
        return true;
    });

    return config;
};
