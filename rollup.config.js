import babel from 'rollup-plugin-babel';
import pkg from './package.json';

export default [
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
  {
    input: 'src/export.js',
    output: {
      file: pkg.main,
      format: 'cjs'
    },
    plugins: [babel()]
  }
];
