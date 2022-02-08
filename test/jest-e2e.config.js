const fs = require('fs');
const swcConfig = JSON.parse(fs.readFileSync(`${__dirname}/../.swcrc`, 'utf8'));

module.exports = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: '.',
    testEnvironment: 'node',
    testRegex: '.e2e-spec.ts$',
    transform: {
        '^.+\\.(t|j)sx?$': [
            '@swc/jest',
            {
                ...swcConfig,
                module: {
                    type: 'commonjs',
                },
            },
        ],
    },
};
