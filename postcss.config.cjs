const OpenProps = require('open-props');

module.exports = {
  plugins: [
    'postcss-import',
    ['postcss-jit-props', OpenProps],
    ['cssnano', { preset: 'default' }],
    [
      'postcss-preset-env',
      {
        features: {
          'custom-properties': false,
          'custom-selectors': true,
        },
      },
    ],
  ],
};
