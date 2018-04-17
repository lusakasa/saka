const defaults = require('@storybook/react/dist/server/config/defaults/webpack.config');
const webpack = require('webpack');

const path = require('path');
const join = path.join;
const marked = require('marked');
const renderer = new marked.Renderer();

const env = 'dev:chrome:benchmark';
const [mode, platform, benchmark] = env.split(':');
const version = require('../static/manifest.json').version;

// module.exports = (base, env) => {
//   const config = defaults(base, env);
//   return Object.assign({}, config, {
//     resolve: Object.assign({}, config.resolve, {
//       alias: Object.assign({}, (config.resolve || {}).alias, {
//         react: 'preact-compat',
//         'react-dom': 'preact-compat',
//         src: path.join(__dirname, '../src'),
//         msg: path.join(__dirname, '../src/msg'),
//         suggestion_engine: path.join(__dirname, '../src/suggestion_engine'),
//         suggestion_utils: path.join(__dirname, '../src/suggestion_utils'),
//         lib: path.join(__dirname, '../src/lib'),
//         scss: path.join(__dirname, '../src/scss')
//       }),
//       modules: ['../src', '../node_modules']
//     }),
//     module: Object.assign({}, config.module, {
//       rules: [
//         {
//           test: /\.(sc|c)ss$/,
//           include: path.resolve(__dirname, '../src'),
//           loaders: [
//             {
//               use: [
//                 'style-loader',
//                 { loader: 'css-loader' },
//                 {
//                   loader: 'sass-loader',
//                   options: {
//                     importer: function(url, prev) {
//                       if (url.indexOf('@material') === 0) {
//                         var filePath = url.split('@material')[1];
//                         var nodeModulePath = `./node_modules/@material/${filePath}`;
//                         return {
//                           file: require('path').resolve(nodeModulePath)
//                         };
//                       }
//                       return { file: url };
//                     }
//                   }
//                 }
//               ]
//             }
//           ]
//         }
//       ]
//     }),
//     plugins: [
//       new webpack.DefinePlugin({
//         'process.env.NODE_ENV': JSON.stringify('development'),
//         SAKA_DEBUG: JSON.stringify(true),
//         SAKA_VERSION: JSON.stringify(version + ' dev'),
//         SAKA_PLATFORM: JSON.stringify(platform),
//         SAKA_BENCHMARK: JSON.stringify(benchmark === 'benchmark')
//       }),
//       new webpack.ProvidePlugin({
//         Component: ['preact', 'Component'],
//         React: ['preact-compat']
//       })
//     ].concat(config.plugins)
//   });
// };

module.exports = (baseConfig, env, defaultConfig) => {
  defaultConfig.resolve = ({},
  defaultConfig.resolve,
  {
    alias: {
      react: 'preact-compat',
      'react-dom': 'preact-compat',
      src: path.join(__dirname, '../src'),
      msg: path.join(__dirname, '../src/msg'),
      suggestion_engine: path.join(__dirname, '../src/suggestion_engine'),
      suggestion_utils: path.join(__dirname, '../src/suggestion_utils'),
      lib: path.join(__dirname, '../src/lib'),
      scss: path.join(__dirname, '../src/scss')
    },
    modules: ['src', 'node_modules']
  });

  defaultConfig.module.rules.push(
    {
      test: /\.js$/,
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
            importer: function(url, prev) {
              if (url.indexOf('@material') === 0) {
                var filePath = url.split('@material')[1];
                var nodeModulePath = `node_modules/@material/${filePath}`;
                return { file: require('path').resolve(nodeModulePath) };
              }
              return { file: url };
            }
          }
        }
      ],
      include: path.resolve(__dirname, '../src/')
    },
    {
      test: /\.md$/,
      loaders: [
        'html-loader',
        {
          loader: 'markdown-loader',
          options: {
            renderer
          }
        }
      ]
    }
  );

  defaultConfig.plugins.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      SAKA_DEBUG: JSON.stringify(true),
      SAKA_VERSION: JSON.stringify(version + ' dev'),
      SAKA_PLATFORM: JSON.stringify(platform),
      SAKA_BENCHMARK: JSON.stringify(benchmark === 'benchmark')
    }),
    new webpack.ProvidePlugin({
      Component: ['preact', 'Component'],
      React: ['preact-compat']
    })
  );

  return defaultConfig;
};
