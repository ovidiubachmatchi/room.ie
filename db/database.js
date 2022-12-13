const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "RoomIe",
  password: "1234",
  port: "5432",
});

client.connect((err) => {
  if (err) {
    console.error('connection error', err.stack);
  } else {
    console.log('connected to database');
  }
});

module.exports = client;