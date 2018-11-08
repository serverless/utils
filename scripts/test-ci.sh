set -e
if [ $TRAVIS_OS_NAME = "windows" ]; then
   echo "running tests in cmd.exe..."
   cmd.exe /c jest . --runInBand --forceExit --colors
else
   echo "running tests in bash..."
   jest . --runInBand --forceExit --colors
fi
codecov
