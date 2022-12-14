const express = require('express');
const { user } = require('pg/lib/defaults');
const app = express();
const client = require('../db/database.js');
const compare = require('../helpers/compare')

module.exports = {
    getPreferences: (id,res) => {
    let userData
    let usersToBeCompart
    const queryUser = `
    SELECT u.*, up.*
    FROM "Users" AS u
    INNER JOIN "UserPreference" AS up
    ON u."Id" = up."IdUser"
    WHERE u."Id" = $1
    `;
    const queryComp = `SELECT u.*, up.*
    FROM "Users" AS u
    INNER JOIN "UserPreference" AS up
    ON u."Id" = up."IdUser"
    WHERE u."Id" != $1`
    const values = [id];
  
    // get user data
    client.all(queryUser, values, (err, rows) => {
      if (err) {
        res.status(500).send(err);
      } else {
         userData = rows.map((row) => ({
            id: row.id,
            name: row.name,
            preference: row.CommuneThings,
          }));
      }
    });

    // get users to compare
    db.all(queryComp, values, (err, rows) => {
      if (err) {
        res.status(500).send(err);
      } else {
         userDataComp = rows.map((row) => ({
            id: row.id,
            name: row.name,
            preference: row.CommuneThings,
          }));
          let dataToBeSent = {
              userData: userData,
              usersToCompare: userDataComp
          }
          let otherUserCompatability = compare.findCommonThings(dataToBeSent)
          let rezult ={
              userId: userData[0].id,
              userName: userData[0].name,
              userCompatabilityWithOtherUsers: otherUserCompatability 
          } 
        res.send(rezult);
      }
    });
    
  }
}