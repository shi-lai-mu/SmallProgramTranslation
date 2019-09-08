module.exports = {
  "extends": ["eslint:recommended", "plugin:react/recommended"],
  "plugins": [
    "react",
    "typescript"
  ],
  "parser": "typescript-eslint-parser",
  "env": {
    "es6": true,
    "browser": true,
    "node": true
  },
  "rules": {
    "no-tabs": 2,
    "quotes": [2, "single", { "allowTemplateLiterals": true }],
    "jsx-quotes": [2, "prefer-single"],
    "eqeqeq": 2,
    "no-undef": 0,
    "no-console": "off",
    "typescript/class-name-casing": 2
  },
  "parserOptions": {
      "ecmaVersion": 6,
      "sourceType": "module",
      "ecmaFeatures": {
          "jsx": true
      }
  }
}