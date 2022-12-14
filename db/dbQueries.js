const client = require('../db/database.js');

function addUserToDB(user) {
    // add user to db
    const values = [user.name, user.password];
    const prefValue = [user.preference]
    const queryText = `
        INSERT INTO users (name, password)
        VALUES (?, ?)
      `;
      const queryTextPreferences =`
      INSERT INTO UserPreferences (CommuneThings)
      VALUES(?)`
    client.run(queryText, values, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('User added to db');
        }
    });
    client.run(queryTextPreferences, prefValue, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Users preferences added to db');
        }
    })
}

function addUserQuery(user, res) {
    // check if user already exists query
    const checkUserQuery = `SELECT * FROM users WHERE name = ?`;
    client.get(checkUserQuery, [user.name], (err, row) => {
        // if call to db fails
        if (err) {
            console.log(err);
        } else if (row) {
            // if user already exists
            res.status(409).send('User already exists');
        } else {
            // if user does not exist
            addUserToDB(user);
            res.status(201).send('User added to db' + user.name);
        }
    });
}

module.exports = {
    addUserQuery
}