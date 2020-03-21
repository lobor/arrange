const toExtends = require('../../.eslintrc.js');
module.exports = {
  ...toExtends,
  settings: {
    'import/resolver': {
      alias: {
        map: [['components', './src/components']],
        extensions: ['.ts', '.tsx']
      }
    }
  }
};
