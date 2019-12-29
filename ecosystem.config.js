module.exports = {
  apps : [{
    name: 'Autoplanet Captacion Front',
    script: 'npm',
    args: 'run start:production',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'ec2-user',
      host : '18.236.82.147',
      ref  : 'origin/master',
      repo : 'git@github.com:fcabezas-ingetelma/autoplanet_captacion_front.git',
      path : '/var/www/production',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
