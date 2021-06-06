# Noughts and Crosses

This website challenges users to play Noughts and Crosses vs an unbeatable AI. It features:

1. Team selection
2. Restart option

## Install

Can be installed from github repository:

`git clone ...`

After installation navigate to the directory and run:

`npm install`

to install the dependencies.

### Development

To start the development server:

`npm run start`

This will start a webpack dev-server that will be available on localhost:8080

### Deployment

Site is deployed on github pages from the gh-pages branch.

Ensure

To redeploy:

```git checkout gh-pages
git checkout -b gh-pages
git merge master
npm run build:css
git add .
git commit -m "Builds latest version"
git push origin gh-pages
git checkout main
```
