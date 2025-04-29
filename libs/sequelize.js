const { Sequelize } = require('sequelize');
const { config } = require('../config/config');
const setupModels = require('../db/models');

let sequelize;

if (config.dbEngine === 'sqlite') {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: config.sqliteStorage,
    logging: console.log
  });
} else {
  const URI = config.dbUrl || `postgres://${config.dbUser}:${config.dbPassword}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
  sequelize = new Sequelize(URI, {
    dialect: 'postgres',
    logging: console.log
  });
}

setupModels(sequelize);

module.exports = sequelize;