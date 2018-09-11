// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  const configuration = {
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, '../coverage'),
      reports: ['text-summary', 'html', 'lcovonly'],
      fixWebpackSourcePaths: true
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    customLaunchers: {
      'ChromiumHeadless': {
        base: 'Chromium',
        flags: [
            '--headless',
            '--disable-gpu',
            '--remote-debugging-port=9222',
            '--no-sandbox',
        ]
      }
    },
    browsers: ['Chrome'],
    singleRun: false
  }
  if (process.env.CI_SERVER) {
    configuration.singleRun = true;
    configuration.autoWatch = false;
    configuration.browsers = ['ChromiumHeadless'];
  }
  config.set(configuration);
};
