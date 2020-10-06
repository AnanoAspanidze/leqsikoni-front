#!/usr/bin/env sh

# abort on errors
set -e

# build
yarn build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add .

git config --global user.email "r.khazalia@gmail.com"
git config --global user.name "Rome00"

git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
#git push -f git@github.com:AnanoAspanidze/AnanoAspanidze.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
#https://github.com/AnanoAspanidze/leqsikoni-front.git
git push -f git@github.com:AnanoAspanidze/leqsikoni-front.git master:gh-pages

cd -