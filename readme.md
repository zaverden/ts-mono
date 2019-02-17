# This is a typescript monorepo

## It uses

1. `tsc` to run type check
2. `babel@7` to transpile TS to JS
3. `tslint` with `airbnb` preset for linting

## Why it is so special?

You don't need to build app project to run it during development.

Even more, you don't have to restart server when you do changes. Just make a change, save a file, and server will be restarted automatically by `babel-watch`. ⚠️ It may be too fast, so port still in use by previous process on restart. In this case just save file once more.

## How it works?

There are several things that made it possible:

1. Use `babel` for transpilation. Well, being honest, I did not try to run the same with `tsc` + `ts-node`. So you may try it.
2. `babel` transpiles TS files into JS **without changing a structure**. It allows us to import any file from package in our app. For development it will import TS file, for production build it will import JS file from same location.

## How to run it?

```bash
yarn # to install all dependencies
yarn start:app # run and watch
```

## How to build it for production?
⚠️ WORK IN PROGRESS

First of all, take a note that it is a bad idea to use `babel-watch` (or `babel-node`, or `ts-node`). Overhead is too big.

To make production build there should be following steps:

1. build app and all dependencies with `babel-cli` (MVP done, check `yarn start:app` command)
2. combine JS output and `package.json` files into dist folder, saving a structure
3. put dist folder into docker image
4. run `yarn install --production` to install runtime dependencies
