const loadJsonFile = require('load-json-file');
const { convert } = require('tsconfig-to-swcconfig');

const swcrc = loadJsonFile('./.swcrc');
const swcFromTsConfig = convert(undefined, undefined, {
    sourceMaps: false,
});

const swcConfig = swcFromTsConfig;

module.exports = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: '.',
    testEnvironment: 'node',
    testRegex: '.e2e-spec.ts$',
    transform: {
        '^.+\\.(t|j)sx?$': ['@swc/jest', swcConfig],
    },
};
