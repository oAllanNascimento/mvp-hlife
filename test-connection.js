// test-connection.js
const { Client } = require('pg');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;
console.log('Trying to connect to:', connectionString.replace(/:([^:@]+)@/, ':****@')); // Esconde a senha no log

const client = new Client({
  connectionString,
  connectionTimeoutMillis: 5000, // 5 segundos de timeout
});

client.connect()
  .then(() => {
    console.log('Connection successful!');
    return client.query('SELECT current_database() as db');
  })
  .then(res => {
    console.log('Database name:', res.rows[0].db);
    client.end();
  })
  .catch(err => {
    console.error('Connection error:', err);
  }); 