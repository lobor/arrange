module.exports = {
  apps: [
    {
      instances: 1,
      name: 'mongo',
      namespace: 'default',
      script: 'docker-compose up mongoDndTool'
    },
    {
      instances: 1,
      name: 'api',
      namespace: 'default',
      script: 'lerna exec --scope api -- npm start'
    },
    {
      instances: 1,
      name: 'desktop',
      namespace: 'default',
      script: 'lerna exec --scope desktop -- npm start'
    },
  ]
};
