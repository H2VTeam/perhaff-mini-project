module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier', 'plugin:import/typescript'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'no-console': 0,
    'import/prefer-default-export': 'off',
    'consistent-return': 'off',
    'arrow-body-style': 'off',
    'no-unused-vars': ['warn'],
    'no-underscore-dangle': 'off',
    camelcase: 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
      },
    ],
  },
};
