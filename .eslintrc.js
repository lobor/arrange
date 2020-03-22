module.exports = {
  extends: [
    'airbnb',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript'
  ],

  plugins: ['prettier', 'import', '@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  rules: {
    'no-underscore-dangle': 0,
    'import/extensions': 0,
    'react-hooks/rules-of-hooks': 0,
    'prettier/prettier': 'error'
  },
  settings: {
    'import/extensions': ['.ts', '.tsx', '.d.ts'],
    // 'import/parsers': {
    //   '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts']
    // },
    'import/resolver': {
      alias: {
        map: [['^components', './packages/desktop/src/components']],
        extensions: ['.ts', '.tsx', '.d.ts']
      }
    }
  }
};
