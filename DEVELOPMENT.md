# Development

# Requirements

* node.js 6.0+
* npm 3.0+

_NOTE:_ we recommend using nvm

```sh
brew install nvm
nvm install 8.5
nvm use 8.5
```

## Setup

```sh
git clone https://github.com/serverless/utils.git
cd utils
npm install
npm run build
```

## Build

To build the project

```sh
npm run build
```


## Watch

To build on every file change

```sh
npm run watch
```


## Clean

To clean and remove all built files

```sh
npm run clean
```


## Cleanse

To clean AND wipe out all installed modules as well as package-lock.json files, use the `cleanse` script.

To cleanse the project

```sh
npm run cleanse
```


## Tests

Run tests for the project

```sh
npm test
```


## Lint

Run lint for the project

```sh
npm run lint
```
