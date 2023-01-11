const sqlite3 = require('sqlite3').verbose();

// open the database connection
// the database will be created in the same directory as this file
// the database will be created only if it does not exist
// the database will be opened in read/write mode
let client = new sqlite3.Database('database.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the local database.');
});

// client serialize is used to run multiple queries in a single transaction
// this is useful when you want to run multiple queries and you want to make sure that all of them are executed
// if one of the queries fails, all the queries will be rolled back
// if all the queries are successful, all the queries will be committed
client.serialize(() => {
  // the table will be created only if it does not exist
  // the table wont change its structure if it already exists
  client.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    password TEXT NOT NULL,
    email TEXT
  )`);

  client.run(`CREATE TABLE IF NOT EXISTS "UserPreferences" (
    "CommuneThings" text,
    "IdUser" INTEGER PRIMARY KEY AUTOINCREMENT
    )`
  );



  client.run(`CREATE TABLE IF NOT EXISTS "Posts" (
    "Location" text,
    "Description" text
    IdUserSesion INTEGER PRIMARY KEY)`
  );
  

});

module.exports = client;
