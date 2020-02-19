module.exports = {
  // Prevent babel-preset-env to mess with the modules
  // so Rollup can run smoothly
  presets: [['@babel/env', { modules: false }]]
};
