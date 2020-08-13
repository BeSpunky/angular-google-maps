// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function(config)
{
    config.set({
        basePath: '',
        frameworks: ['jasmine', '@angular-devkit/build-angular'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage-istanbul-reporter'),
            require('karma-junit-reporter'),
            require('@angular-devkit/build-angular/plugins/karma')
        ],
        client: {
            clearContext: false, // leave Jasmine Spec Runner output visible in browser,
            jasmine: {
                random: false
            }
        },
        reporters: ['progress', 'kjhtml'],
        coverageIstanbulReporter: {
            dir: require('path').join(__dirname, '../../../coverage/bespunky/angular-google-maps'),
            reports: ['html', 'lcovonly'],
            fixWebpackSourcePaths: true
        },
        junitReporter: {
            outputDir: '../../../tests/angular-google-maps'
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false,
        restartOnFileChange: true,
        files: ['testing/google-maps-api.js'],
        browserNoActivityTimeout: 900000 // 15min
    });
};
