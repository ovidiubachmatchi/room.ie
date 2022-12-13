const client = require('../db/database.js');
const express = require('express');
const path = require("path");
const preference = require("../routes/preferences")


module.exports ={
    addUserQuery:(userDetails,res) =>{
        let queryText = 'INSERT INTO "LogInCredential"("UserNameLog", "UserPassLog") VALUES ($1, $2)'
        let values = []
        values.push(userDetails.UserName)
        values.push(userDetails.Password)
        client.query(queryText, values).then(result =>{
            console.log(result)
            res.send(result)
        }).catch(err => {
            res.status = 401
            res.send(err)
        })
    }
}