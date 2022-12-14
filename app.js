const express = require('express');
const path = require("path");
const preference = require("./routes/preferences")
const addUser = require("./db/dbQueries")

const app = express();
const PORT = process.env.PORT || "3000";

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get('/users/', (req, res) => {
    const id = req.query.id;

    if (!id) {
        res.status(400)
        res.send("No id introduced")
    } else {
        preference.getPreferences(id, res)
    }
});

app.post("/signup/", (req, res) => {

    // check if all field s are filled

    if (!req.body.name || !req.body.password) {
        res.status(400);
        res.send("Please fill all fields");
        return;
    }

    // create user object
    let user = {
        name: req.body.name,
        password: req.body.password,
        preference: req.body.preference
    }

    // add user to db
    addUser.addUserQuery(user, res)
})

app.get('/', require('./routes/index'));
app.get('/login', require('./routes/login'));
app.get('/login', require('./routes/search'));

app.listen(PORT, console.log('Server is running on port ' + PORT));