const { getJestProjects } = require('@nrwl/jest');

module.exports = {
    projects: [
        ...getJestProjects(),
        '<rootDir>/apps/official-site',
        '<rootDir>/apps/demo',
        '<rootDir>/libs/angular-google-maps',
    ],
};
