module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended"
  ],
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    sourceType: 'module'
  },
  overrides: [{
    files: ['(*.config.js|.*.js)'],
    env: {
      node: true,
      browser: false
    }
  }]
}