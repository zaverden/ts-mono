module.exports = function (api) {
  api.cache(false);
  return {
    overrides: [
      {
        test: './app',
        extends: './app/.babelrc'
      },
      {
        test: './packages/koaster',
        extends: './packages/koaster/.babelrc'
      }
    ]
  };
};
