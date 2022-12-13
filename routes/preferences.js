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
  
    client.query(queryUser, values, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
         userData = result.rows.map((row) => ({
            id: row.Id,
            name: row.UserName,
            preference: row.CommuneThings,
          }));
      }
    });

    client.query(queryComp, values, (err, result) => {
        if (err) {
          res.status(500).send(err);
        } else {
           userDataComp = result.rows.map((row) => ({
              id: row.Id,
              name: row.UserName,
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