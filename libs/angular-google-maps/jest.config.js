module.exports = {
    displayName: 'angular-google-maps',
    preset: '../../jest.preset.js',
    setupFilesAfterEnv: ['<rootDir>/test-setup.ts'],
    globals: {
        'ts-jest': {
            stringifyContentPathRegex: '\\.(html|svg)$',

            tsconfig: '<rootDir>/tsconfig.spec.json',
        },
    },
    coverageDirectory: '../../coverage/libs/angular-google-maps',
    snapshotSerializers: [
        'jest-preset-angular/build/serializers/no-ng-attributes',
        'jest-preset-angular/build/serializers/ng-snapshot',
        'jest-preset-angular/build/serializers/html-comment',
    ],
    transform: { '^.+\\.(ts|js|html)$': 'jest-preset-angular' },
};
