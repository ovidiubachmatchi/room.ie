const express = require('express');
const session = require('express-session');
const path = require("path");
const preference = require("./routes/preferences")
const addUser = require("./db/dbQueries")

const app = express();
const PORT = process.env.PORT || "3000";

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(session({
    secret: 'my-secret',
    resave: false,
    saveUninitialized: true
}));

app.get('/users/', (req, res) => {
    const id = req.query.id;

    if (!id) {
        res.status(400)
        res.send("No id introduced")
    } else {
        preference.getPreferences(id, res)
    }
});

app.post("/post/", (req, res) => {
    if (!req.body.name || !req.body.password) {
        res.status(400);
        res.send("Please fill all fields");
        return;
    }

    // create user object
    let user = {
        name: session[id],

    }

    // add user to db
    addUser.addUserQuery(user, res)
})

app.get("/signup", (req, res) => {
    res.render("signup", {
        title: "ROOM.IE | Login",
        text: "Please fill out the form",
        login: "Login"
    } );
})

app.get("/post", (req, res) => {
    res.render("post", {
        title: "ROOM.IE | Login",
        text: "Please fill out the form",
        login: "Login"
    } );
})

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
app.get('/search', require('./routes/search'));

app.listen(PORT, console.log('Server is running on port ' + PORT));