module.exports = {
  "extends": [
    "airbnb",
    "plugin:prettier/recommended",
    "react-hooks"
  ],

  "plugins": ["prettier"],

  "rules": {
    "no-underscore-dangle": 0,
    "react-hooks/rules-of-hooks": "warn",
    "prettier/prettier": "error"
  }
};
