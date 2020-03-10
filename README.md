# @inpyjamas/generator-defaults


## About

my personal opinionated [Yeoman](https://yeoman.io/) generator for Typescript, Eslint, Prettier, Jest, Nodemon, Husky…

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

### Type `typescript-express`:

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


All configuration is located in `package.json` (except for [`.prettierignore`](https://github.com/prettier/prettier/issues/3460)).

After the install it will force upgrade all packages.

