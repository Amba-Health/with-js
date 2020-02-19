import babel from 'rollup-plugin-babel';
import pkg from './package.json';

export default [
  // Package a first version for running in the browser
  {
    input: 'src/export.js',
    output: {
      file: pkg.browser,
      format: 'iife',
      name: 'withJS',
      sourcemap: 'inline'
    },
    plugins: [babel()]
  },
  // And a second for import as a CommonJS module
  {
    input: 'src/export.js',
    output: {
      file: pkg.main,
      format: 'cjs'
    },
    plugins: [babel()]
  }
];
