require('dotenv').config({ path: ['.env', '.env.deploy'] });

const {
  PORT, DB_NAME, DB_HOST, DB_PORT, JWT_SECRET,
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REPO, DEPLOY_REF = 'origin/master',
} = process.env;
module.exports = {
  apps: [{
    name: 'api-mesto',
    script: './dist/app.js',
    env_production: {
      NODE_ENV: 'production',
      PORT,
      DB_NAME,
      DB_HOST,
      DB_PORT,
      JWT_SECRET,
    },
    env_development: {
      NODE_ENV: 'development',
      PORT,
      DB_NAME,
      DB_HOST,
      DB_PORT,
      JWT_SECRET,
    },
    env_testing: {
      NODE_ENV: 'testing',
      PORT,
      DB_NAME,
      DB_HOST,
      DB_PORT,
      JWT_SECRET,
    },
  }],
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,
      'pre-deploy-local': `bash scripts/deployEnv.sh ${DEPLOY_USER}@${DEPLOY_HOST} ${DEPLOY_PATH}`,
      'post-deploy': 'cd backend && npm i && npm run build && pm2 startOrRestart ecosystem.config.js --env production',
    },
  },
};
