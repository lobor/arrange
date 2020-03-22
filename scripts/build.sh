#!/bin/bash

export SERVER_URL=https://lobor-dnd-tool.herokuapp.com
export CLIENT_URL=https://lobor-dnd-tool.herokuapp.com

lerna exec --scope desktop -- npm run build
lerna exec --scope api -- npm run build

cp -R ./packages/desktop/build ./packages/api/build/public
