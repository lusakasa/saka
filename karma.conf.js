module.exports = function (config) {
  config.set({
    singleRun: true,
    webpack: {
      devtool: 'inline-source-map',
      'resolve': {
        'alias': {
          'react-dom/server': 'preact-render-to-string',
          'react-dom/test-utils': 'preact-test-utils',
          'react-dom': 'preact-compat-enzyme',
          'react-test-renderer/shallow': 'preact-test-utils',
          'react-test-renderer': 'preact-test-utils',
          'react-addons-test-utils': 'preact-test-utils',
          'react-addons-transition-group': 'preact-transition-group',
          'react': 'preact-compat-enzyme'
        }
      },
      module: {
        loaders: [{
          test: /\.js/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            'plugins': [
              [
                'transform-decorators-legacy'
              ],
              [
                'transform-react-jsx',
                {
                  'pragma': 'h'
                }
              ],
              [
                'transform-object-rest-spread'
              ]
            ],
            'presets': [
              [
                'es2015',
                {
                  'es2015': {
                    'loose': true,
                    'modules': false
                  }
                }
              ],
              'react'
            ]
          }
        }, {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }]
      },
      watch: true
    },
    webpackServer: { noInfo: true },
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      { pattern: 'tests/test-context.js', watched: false }
    ],
    preprocessors: {
      'tests/test-context.js': ['webpack']
    },
    reporters: ['spec'], // This line is extra important, it enabled the green checkmarks in the specs
    specReporter: {
      maxLogLines: 5, // limit number of lines logged per test
      suppressErrorSummary: true, // do not print error summary
      suppressFailed: false, // do not print information about failed tests
      suppressPassed: false, // do not print information about passed tests
      suppressSkipped: true, // do not print information about skipped tests
      showSpecTiming: false // print the time elapsed for each spec
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['ChromeHeadless'],
    customLaunchers: {
      Chrome_without_sandbox: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    concurrency: Infinity
  });
};
