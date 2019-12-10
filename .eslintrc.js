module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended"
  ],
  parser: 'babel-eslint',
  env: {
    browser: true
  },
  parserOptions: {
    sourceType: 'module'
  }
}