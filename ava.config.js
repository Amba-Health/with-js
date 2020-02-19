export default {
  // Lets ava understand `import` statement thanks to the `esm` module
  require: 'esm',
  // Sets a custom glob for finding tests, allowing to differenciate
  // test files from supporting files in the `__tests__` folders
  files: ['**/*.test.js']
};
