module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'prettier'
  ],
  plugins: [],
  parserOptions: {
    'sourceType': 'module',
    'ecmaVersion': 2020
  },
  rules: {
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'comma-dangle': ['error', 'only-multiline'],
    'react/react-in-jsx-scope': 'off'
  }
};
