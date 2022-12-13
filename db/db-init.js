const pg = require('pg');

const client = new pg.Client({
  user: "postgres",
  host: "localhost",
  password: "1234",
  port: "5432",
});

client.connect((err) => {
  if (err) {
    console.error('Failed to connect to database:', err);
    return;
  }

  console.log('Connected to database.');
  client.query('CREATE DATABASE RoomIe', (err, res) => {
    if (err) {
      console.error('Error creating database: ', err);
      return;
    }
    client.query(`
  CREATE TABLE IF NOT EXISTS "UserPreferences" (
    "CommuneThings" text NOT NULL,
    "IdUser" bigserial NOT NULL,
    PRIMARY KEY ("IdUser")
  );
`, (err) => {
      if (err) {
        console.error('Failed to create table "UserPreference":', err);
        return;
      }

      console.log('Table "UserPreference" created.');

      client.query(`
    CREATE TABLE IF NOT EXISTS "Users" (
        "Id" bigserial NOT NULL,
        "UserName" text NOT NULL,
        PRIMARY KEY ("Id"),
        FOREIGN KEY ("Id")
        REFERENCES public."UserPreferences" ("IdUser") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
        );
  `, (err) => {
        if (err) {
          console.error('Failed to create table "Users":', err);
          return;
        }

        console.log('Table "Users" created.');


        client.query(`
      CREATE TABLE IF NOT EXISTS "UserLogIn" (
        "UserNameLog" text NOT NULL,
        "Password" text NOT NULL,
        "Id" bigserial NOT NULL,
        PRIMARY KEY ("Id"),
        FOREIGN KEY ("Id")
        REFERENCES public."Users" ("Id") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
      )
    `, (err) => {
          if (err) {
            console.error('Failed to create table "UserPreference":', err);
            return;
          }

          console.log('Table "UserLogIn" created.');



          client.end();
        });
      });
    })
  })
})
