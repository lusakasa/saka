const webpack = require('webpack');

const path = require('path');
const join = path.join;

const env = 'dev:chrome:benchmark';
const [mode, platform, benchmark] = env.split(':');
const version = require('./static/manifest.json').version;

function resolveCwd() {
  let args = [].slice.apply(arguments, []);
  args.unshift(process.cwd());
  return join.apply(path, args);
}

const indexSpec = resolveCwd('test/**/*.test.js');
const files = [indexSpec];

const preprocessors = {};
preprocessors[resolveCwd('test/**/*.test.js')] = ['webpack', 'sourcemap'];

module.exports = function(config) {
  let configuration = {
    singleRun: true,
    webpack: {
      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('development'),
          SAKA_DEBUG: JSON.stringify(true),
          SAKA_VERSION: JSON.stringify(version + ' dev'),
          SAKA_PLATFORM: JSON.stringify(platform),
          SAKA_BENCHMARK: JSON.stringify(benchmark === 'benchmark')
        })
      ],
      // devtool: 'inline-source-map',
      resolve: {
        alias: {
          src: path.join(__dirname, 'src'),
          msg: path.join(__dirname, 'src/msg'),
          suggestion_engine: path.join(__dirname, 'src/suggestion_engine'),
          suggestion_utils: path.join(__dirname, 'src/suggestion_utils'),
          lib: path.join(__dirname, 'src/lib')
          //     'react-dom/server': 'preact-render-to-string',
          //     'react-dom/test-utils': 'preact-test-utils',
          //     'react-dom': 'preact-compat-enzyme',
          //     'react-test-renderer/shallow': 'preact-test-utils',
          //     'react-test-renderer': 'preact-test-utils',
          //     'react-addons-test-utils': 'preact-test-utils',
          //     'react-addons-transition-group': 'preact-transition-group',
          //     'react': 'preact-compat-enzyme'
        }
      },
      externals: {
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true,
        'react/addons': true
      },
      module: {
        loaders: [
          {
            test: /\.js/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
              plugins: [
                ['transform-decorators-legacy'],
                [
                  'transform-react-jsx',
                  {
                    pragma: 'h'
                  }
                ],
                ['transform-object-rest-spread'],
                ['transform-class-properties']
              ],
              presets: [
                [
                  'env',
                  {
                    targets: {
                      browsers: ['last 2 Chrome versions']
                    }
                  }
                ],
                'react'
              ]
            }
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          }
        ]
      },
      watch: true
    },
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
