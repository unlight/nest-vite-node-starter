const getJestMappersFromTSConfig = require('tsconfig-paths-jest-mapper');
const loadJsonFile = require('load-json-file');
const { convert } = require('tsconfig-to-swcconfig');

const swcrc = loadJsonFile('./.swcrc');
const swcFromTsConfig = convert(undefined, undefined, {
    sourceMaps: false,
});

const swcConfig = swcFromTsConfig;

module.exports = {
    testEnvironment: 'node',
    setupFiles: ['<rootDir>/jest.setup.ts'],
    transform: {
        '^.+\\.(t|j)sx?$': ['@swc/jest', swcConfig],
    },
    collectCoverage: false,
    coverageDirectory: 'coverage',
    coverageReporters: [
        // "lcov",
        'text',
    ],
    collectCoverageFrom: ['src/**/*.ts', '!src/**/*.spec.ts'],
    testMatch: ['<rootDir>/src/**/*.spec.ts'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    modulePathIgnorePatterns: ['<rootDir>/dist'],
    moduleNameMapper: {
        ...getJestMappersFromTSConfig(),
        '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
        '\\.(gif|ttf|eot|svg|png|jpg|jpeg)$': '<rootDir>/test/__mocks__/fileMock.js',
    },
};
