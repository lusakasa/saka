const mainWebpackConfig = require('./webpack.config.js');
const path = require('path');

const env = 'development:chrome:benchmark';
const [mode] = env.split(':');

const files = ['test/index.test.js'];

const preprocessors = {
  'test/index.test.js': ['webpack']
};

const karmaWebpackConfig = Object.assign({}, mainWebpackConfig(env), {
  mode,
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      },
      {
        test: /\.(sc|c)ss$/,
        loaders: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              importer(url, prev) {
                if (url.indexOf('@material') === 0) {
                  const filePath = url.split('@material')[1];
                  const nodeModulePath = `./node_modules/@material/${filePath}`;
                  return { file: path.resolve(nodeModulePath) };
                }
                return { file: url };
              }
            }
          }
        ]
      }
    ]
  },
  optimization: {},
  devtool: false
});

module.exports = function karmaConfig(config) {
  const configuration = {
    singleRun: true,
    webpack: karmaWebpackConfig,
    webpackServer: { noInfo: true },
    basePath: '',
    frameworks: ['jasmine'],
    files,
    preprocessors,
    reporters: ['spec'], // This line is extra important, it enabled the green checkmarks in the specs
    specReporter: {
      maxLogLines: 5, // limit number of lines logged per test
      suppressErrorSummary: true, // do not print error summary
      suppressFailed: false, // print information about failed tests
      suppressPassed: false, //  print information about passed tests
      suppressSkipped: false, // print information about skipped tests
      showSpecTiming: true // print the time elapsed for each spec
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    concurrency: Infinity
  };

  if (process.env.TRAVIS) {
    configuration.browsers = ['Chrome_travis_ci'];
  }

  config.set(configuration);
};
