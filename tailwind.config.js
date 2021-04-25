module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  prefix: 'cr-',
  mode: 'jit',
  purge: ['./src/**/*.jsx', './src/**/*.js', './src/**/*.tsx'],
  theme: {
    extend: {},
  },
  variants: {},
};
