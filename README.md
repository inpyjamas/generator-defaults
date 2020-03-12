# @inpyjamas/generator-defaults

![npm (scoped)](https://img.shields.io/npm/v/@inpyjamas/generator-defaults) ![Node.js Test CI](https://github.com/inpyjamas/generator-defaults/workflows/Node.js%20Test%20CI/badge.svg) ![Build with love](https://img.shields.io/badge/build%20with-%E2%9D%A4%EF%B8%8F-success)

## About

my personal opinionated [Yeoman](https://yeoman.io/) generator for Typescript, Eslint, Prettier, Jest, Nodemon, Husky, Jekyll, Webpack…

With force upgrade all packages build in.

All configuration that can use cosmic config is located in `package.json`.  

Except for

- [`.prettierignore`](https://github.com/prettier/prettier/issues/3460)
- Jekyll `_config.yml` and `Gemfile`

## Installing

```bash
npm install yo -g
```

```bash
npm install @inpyjamas/generator-defaults -g
```

## Usage

```bash
yo @inpyjamas/defaults
# Will prompt for your projects name and what type of project you want
# currently typescript only
```

This will create (in the current working directory) the following setup(s)

### Type `typescript-express`

Creates a setup with: 


- Typescript
- Jest
- Eslint
- Prettier
- Nodemon
- Husky
- Lint-Staged
- Express with Morgan, Cors and Dotenv
- CZ Conventional Change-log
- Renovate Bot

### Type `typescript-jeykll-webpack`

- Typescript
- Jekyll
- Webpack (for Ts and scss/postcss)
- Jest
- Eslint
- Prettier
- Husky
- Lint-Staged
- CZ Conventional Change-log
- Renovate Bot
