const searchView = (req, res) => {
    if (!req.query.city) {
        res.render("search", {
            title: "Search Page | Room.ie",
            login: ""
        } );
    } else {
        posts = retrievePosts(req.query.city)
        if(!posts)
            res.send("Retrieved 0 data for city=" + req.query.city)
        res.send("RETRIEVED")
    }
}

function retrievePosts(city) {
    // get all data from database from the same city
    let sql = 'SELECT * FROM posts WHERE city = "' + city + '"';

    const client = require('../db/database.js');

    client.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            console.log(row.id + "\t" + row.userID + "\t" + row.city + "\t" + row.moveInDate + "\t" + row.moveOutDate + "\t" + row.description);
        });
        return rows;
    });
}

module.exports =  {
    searchView
};