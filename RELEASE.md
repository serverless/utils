# Release

This guide is a simple instruction set for releasing a new version of @serverless/utils


## Notes
- We use git tags for releasing @serverless/utils through Travis.

## Instructions
- Make sure your local master is up to date with latest commits.
```sh
git checkout master
git pull --rebase
```
- Checkout a new release branch. Replace Xs with the version number you are releasing.
```sh
git checkout -b release-vX.X.X
```
- Update package.json to new version number
- Cleanse project (clears out package-lock.json and installed node_modules)
```sh
npm run cleanse
```
- Setup project
```sh
npm run setup
```
- Version numbers are now updated
- Run test to ensure tests are passing. If tests are not, abort release and fix tests.
```sh
npm run test
```
- run lint to ensure files have bene linted. If lint is not passing, abort release and fix lint issues.
```sh
npm run lint
```
- Update docs with new version numbers
```sh
npm run docs:gen
```
- Commit files changes with new version numbers. Replace Xs with new version number.
```sh
git commit -m"Releasing vX.X.X"
git push origin release-vX.X.X
```
- Open PR on github for new release
- Get PR review from core contributor
- After reviewed and after Travis has passed build, merge PR.
- Checkout master from git and pull version changes
```sh
git checkout master
git pull --rebase
```
- Tag a new release in git
```sh
git tag vX.X.X
```
- Push tags
```sh
git push --tags
```
- Travis will release new version from tag.
- Relax and enjoy new version!
