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
      host : '54.213.163.10',
      ref  : 'origin/feature/cambio_de_telefono',
      repo : 'git@github.com:fcabezas-ingetelma/autoplanet_captacion_front.git',
      path : '/home/ec2-user/autoplanet_captacion_front',
      key  : '../aws_keys/autoplanet_front.pem',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
