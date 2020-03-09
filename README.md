# generator-aguyinhispyjamas

![Node.js CI](https://github.com/fabianmoronzirfas/generator-aguyinhispyjamas/workflows/Node.js%20CI/badge.svg)

## About

my personal opinionated [Yeoman](https://yeoman.io/) generator for Typescript, Eslint, Prettier, Jest, Nodemon, Husky…

## Installing

```bash
npm install yo -g
```

```bash
npm install generator-aguyinhispyjamas -g
```

## Usage

```bash
yo aguyinhispyjamas
# Will prompt for your projects name and what type of project you want
# currently typescript only
```

This will create (in the current working directory) the following setup(s)

### Type `ts`:

- Typescript
- Jest
- Eslint 
- Prettier
- Nodemon
- Husky
- Lint-Staged
- Express with Morgan, Cors and Dotenv
- CZ Conventional Changelog
- Renovate Bot


All configuration is located in `package.json` (except for [`.prettierignore`](https://github.com/prettier/prettier/issues/3460)).

After the install it will force upgrade all packages.

