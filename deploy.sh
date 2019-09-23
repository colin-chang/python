#!/usr/bin/env sh

set -e
# GitHub Pages
rm -rf docs/.vuepress/dist
npm run build
cd docs/.vuepress/dist
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:colin-chang/python.git master:gh-pages
cd -

# Standalone
rm -rf docs/.vuepress/dist
sed -i "" "s/base: '\/python\/'/base: '\/'/g" docs/.vuepress/config.js
npm run build
cd docs/.vuepress/dist
echo 'python.colinchang.net' > CNAME
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:colin-chang/python.git master:standalone
cd -
sed -i "" "s/base: '\/'/base: '\/python\/'/g" docs/.vuepress/config.js