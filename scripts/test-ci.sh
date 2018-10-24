set -e
jest . --runInBand --forceExit --colors
codecov
