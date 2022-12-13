const express = require('express');
const path = require("path");
const preference = require("./routes/preferences")
const addUser = require("./db/dbQueries")

const app = express();
const PORT = process.env.PORT || "3000";

app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get('/users/', (req, res) => {
    const id = req.query.id;

    console.log(id)

    if (!id) {
        res.status(400)
        res.send("No id introduced")
    } else {
        console.log(id)
        preference.getPreferences(id, res)
    }
});

app.get("/addUser/:UserName", (req, res) => {
    let detail = {
        UserName: req.params.UserName,
        Password: req.query.Password,
        User: req.query.User
    }
    if ((!detail.Password || !detail.User)) {
        let err = "Password or userNameToDisplay not introduced"
        res.status(400)
        res.send(err)
    } else {
        addUser.addUserQuery(detail, res)
    }
})

app.get('/', require('./routes/index'));
app.get('/login', require('./routes/login'));
app.get('/login', require('./routes/search'));

app.listen(PORT, console.log('Server is running on port ' + PORT));