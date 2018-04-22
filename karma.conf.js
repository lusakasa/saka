const webpack = require('webpack');
const mainWebpackConfig = require('./webpack.config.js');
const path = require('path');

const join = path.join;

const env = 'dev:chrome:benchmark';
const [mode, platform, benchmark] = env.split(':');
const version = require('./static/manifest.json').version;

function resolveCwd() {
  const args = [].slice.apply(arguments, []);
  args.unshift(process.cwd());
  return join.apply(path, args);
}

const indexSpec = resolveCwd('test/**/*.test.js');
const files = [indexSpec];

const preprocessors = {};
preprocessors[resolveCwd('test/**/*.test.js')] = ['webpack', 'sourcemap'];

const karmaWebpackConfig = Object.assign({}, mainWebpackConfig(env), {
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
  optimization: {}
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
