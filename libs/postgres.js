const { Client } = require('pg');

async function getConnection() {
  const client = new Client({
    host: '',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'my_api',
  });

  await client.connect();
  return client;
}

module.exports = getConnection;

