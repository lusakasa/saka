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

// {
//   // devtool: 'inline-source-map',
//   resolve: {
//     alias: {
//       react: 'preact-compat',
//       'react-dom': 'preact-compat',
//       src: path.join(__dirname, 'src'),
//       msg: path.join(__dirname, 'src/msg'),
//       suggestion_engine: path.join(__dirname, 'src/suggestion_engine'),
//       suggestion_utils: path.join(__dirname, 'src/suggestion_utils'),
//       lib: path.join(__dirname, 'src/lib'),
//       scss: path.join(__dirname, 'src/scss')
//       //     'react-dom/server': 'preact-render-to-string',
//       //     'react-dom/test-utils': 'preact-test-utils',
//       //     'react-dom': 'preact-compat-enzyme',
//       //     'react-test-renderer/shallow': 'preact-test-utils',
//       //     'react-test-renderer': 'preact-test-utils',
//       //     'react-addons-test-utils': 'preact-test-utils',
//       //     'react-addons-transition-group': 'preact-transition-group',
//       //     'react': 'preact-compat-enzyme'
//     },
//     modules: ['./src', './node_modules']
//   },
//   externals: {
//     'react/lib/ExecutionEnvironment': true,
//     'react/lib/ReactContext': true,
//     'react/addons': true
//   },
//   module: {
//     loaders: [
//       {
//         test: /\.js/,
//         exclude: /node_modules/,
//         loader: 'babel-loader',
//         query: {
//           plugins: [
//             ['transform-decorators-legacy'],
//             [
//               'transform-react-jsx',
//               {
//                 pragma: 'h'
//               }
//             ],
//             ['transform-object-rest-spread'],
//             ['transform-class-properties']
//           ],
//           presets: [
//             [
//               'env',
//               {
//                 targets: {
//                   browsers: ['last 2 Chrome versions']
//                 }
//               }
//             ],
//             'react'
//           ]
//         }
//       },
//       {
//         test: /\.(sc|c)ss$/,
//         use: [
//           'style-loader',
//           { loader: 'css-loader' },
//           {
//             loader: 'sass-loader',
//             options: {
//               importer(url, prev) {
//                 if (url.indexOf('@material') === 0) {
//                   const filePath = url.split('@material')[1];
//                   const nodeModulePath = `./node_modules/@material/${filePath}`;
//                   return { file: require('path').resolve(nodeModulePath) };
//                 }
//                 return { file: url };
//               }
//             }
//           }
//         ]
//       }
//     ]
//   },
//   plugins: [
//     new webpack.DefinePlugin({
//       'process.env.NODE_ENV': JSON.stringify('development'),
//       SAKA_DEBUG: JSON.stringify(true),
//       SAKA_VERSION: JSON.stringify(`${version} dev`),
//       SAKA_PLATFORM: JSON.stringify(platform),
//       SAKA_BENCHMARK: JSON.stringify(benchmark === 'benchmark')
//     })
//   ],
//   watch: true
// }
