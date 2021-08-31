const fs = require('fs');
const getJestMappersFromTSConfig = require('tsconfig-paths-jest-mapper');
const swcConfig = JSON.parse(fs.readFileSync(`${__dirname}/.swcrc`, 'utf8'));

module.exports = {
    testEnvironment: 'node',
    setupFiles: ['<rootDir>/jest.setup.ts'],
    transform: {
        '^.+\\.(t|j)sx?$': [
            '@swc/jest',
            {
                ...swcConfig,
                module: {
                    type: 'commonjs',
                    strict: false,
                    strictMode: true,
                    lazy: false,
                    noInterop: false,
                },
            },
        ],
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
        '\\.(gif|ttf|eot|svg|png|jpg|jpeg)$':
            '<rootDir>/test/__mocks__/fileMock.js',
    },
};
