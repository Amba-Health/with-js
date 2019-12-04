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
  },
  "overrides": [
    {
      "files": [
        "**/__tests__/**/*"
      ],
      rules: {
        // Tests will require dev only packages
        "node/no-unpublished-require": 0
      }
    }
  ]
}