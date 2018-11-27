set -e
npm install -g codecov
if [ $TRAVIS_OS_NAME == "windows" ]; then
  choco install rsync
fi
