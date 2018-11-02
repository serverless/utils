# Development

## Requirements

* node.js 6.0+
* npm 6.0+

_NOTE:_ we recommend using [nvm](https://github.com/creationix/nvm)

```sh
brew install nvm
nvm install 8.12
nvm use 8.12
```

## Tasks
The following outlines the commands for common development tasks.

### Setup

To setup the project for development run the below commands. After these have been run you will be able to use the project else where, run tests, etc.

```sh
git clone https://github.com/serverless/utils.git
cd utils
npm run setup
```

### Build

To build the project

```sh
npm run build
```


### Watch

To build on every file change

```sh
npm run watch
```


### Clean

To clean and remove all built files

```sh
npm run clean
```


### Cleanse

To clean AND wipe out all installed modules as well as `package-lock.json` files, use the `cleanse` script.

To cleanse the project

```sh
npm run cleanse
```


### Test

Run tests for the project

```sh
npm test
```


### Lint

Run lint for the project

```sh
npm run lint
```

### Docs gen

Run docs generation for the project

```sh
npm run docs:gen
```
