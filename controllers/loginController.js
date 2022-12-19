const client = require("../db/database")

const loginView = async (req, res) => {
    if (req.session.user) {
        // user is logged in, show their profile
        res.redirect("/");
    }

    if (!req.query.username || !req.query.password) {
        res.render("login", {
            title: "ROOM.IE | Login",
            text: "Please fill out the form",
            login: "Login"
        } );
    } else {
        id = await getUserFromDB(req.query.username, req.query.password)
        if (id == -1 || id == undefined) {
            res.render("login", {
                title: "ROOM.IE | Wrong credentials",
                text: "Wrong credentials",
                login: "Login"
            } );
            return;
        } else {
        req.session.user = {
            id: id,
            username: req.query.username,
            email: req.query.password
        };
        res.redirect("/")
        }
    }
}

async function getUserFromDB(username, password) {
  // create a query to check if the user exists
  const checkUserQuery = `SELECT * FROM users WHERE name = ? AND password = ?`;
  let id;
  await new Promise((resolve, reject) => {
  client.get(checkUserQuery, [username, password], (err, row) => {
      // if call to db fails
      if (err) {
          console.log(err);
      } else if (row) {
        id = row.id
      } else {
         id = -1
      }
      resolve();
    })
  });
  return id;
}

module.exports =  {
    loginView
};