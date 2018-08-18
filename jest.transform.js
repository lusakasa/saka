const babelOptions = {
  presets: [['env', { targets: { node: '8' } }], 'react'],
  plugins: [
    [
      'transform-react-jsx',
      {
        pragma: 'h'
      }
    ]
  ]
};
module.exports = require('babel-jest').createTransformer(babelOptions);
