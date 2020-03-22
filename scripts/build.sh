#!/bin/bash

lerna exec --scope desktop -- npm run build
lerna exec --scope api -- npm run build

cp -R ./packages/desktop/build ./packages/api/build/public
