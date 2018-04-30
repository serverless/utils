rm -rf dist
mkdir -p dist
rsync -avz --exclude *.js --exclude __tests__ --exclude node_modules src/ dist/
babel -w src -d dist --source-maps
