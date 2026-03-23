const { config } = require('../config/config');

const buildUrl = () => {
  if (config.dbUrl) return config.dbUrl;
  
  const user = encodeURIComponent(config.dbUser || 'postgres');
  const password = encodeURIComponent(config.dbPassword || 'postgres');
  const host = config.dbHost || 'localhost';
  const port = config.dbPort || 5432;
  const db = config.dbName || 'my_api';
  
  return `postgres://${user}:${password}@${host}:${port}/${db}`;
};

module.exports = {
  development: {
    url: buildUrl(),
    dialect: 'postgres',
    logging: false
  },
  production: {
    url: buildUrl(),
    dialect: 'postgres',
    logging: false
  }
};
