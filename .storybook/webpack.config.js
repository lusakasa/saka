const defaults = require('@storybook/react/dist/server/config/defaults/webpack.config');
const webpack = require('webpack');

const env = 'dev:chrome:benchmark';
const [mode, platform, benchmark] = env.split(':');
const version = require('../static/manifest.json').version;

module.exports = (base, env) => {
  const config = defaults(base, env);
  return Object.assign({}, config, {
    resolve: Object.assign({}, config.resolve, {
      alias: Object.assign({}, (config.resolve || {}).alias, {
        react: 'preact-compat',
        'react-dom': 'preact-compat'
      })
    }),
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development'),
        'SAKA_DEBUG': JSON.stringify(true),
        'SAKA_VERSION': JSON.stringify(version + ' dev'),
        'SAKA_PLATFORM': JSON.stringify(platform),
        'SAKA_BENCHMARK': JSON.stringify(benchmark === 'benchmark')
      }),
      new webpack.ProvidePlugin({
        Component: ['preact', 'Component'],
        React: ['preact-compat']
      })
    ].concat(config.plugins)
  })
};