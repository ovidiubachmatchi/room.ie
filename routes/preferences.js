const e = require('express');
const express = require('express');
const app = express();
const client = require('../db/database.js');
const compare = require('../helpers/compare')

module.exports = {
    getPreferences: async (id,res) => {
    let userData
    let usersToBeCompart
    const queryUser = `
    SELECT u.*, up.*
    FROM "Users" AS u
    INNER JOIN "UserPreferences" AS up
    ON u."Id" = up."IdUser"
    WHERE u."Id" = $1
    `;
    const queryComp = `SELECT u.*, up.*
    FROM "Users" AS u
    INNER JOIN "UserPreferences" AS up
    ON u."Id" = up."IdUser"
    WHERE u."Id" != $1`
    const values = [id];
  
    // get user data
   await client.all(queryUser, values, (err, rows) => {
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
  await  client.all(queryComp, values, (err, rows) => {
      if (err) {
        res.status(500).send(err);
      } else {
        let rezult
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
          if(otherUserCompatability === "no users"){
             rezult = "thre are no users"
          }else{
           rezult ={
              userId: userData[0].id,
              userName: userData[0].name,
              userCompatabilityWithOtherUsers: otherUserCompatability 
          } 
        }
        res.send(rezult);
      }
    });
    
  }
}