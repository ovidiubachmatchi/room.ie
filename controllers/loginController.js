const loginView = (req, res) => {
    res.render("login", {
        title: "ROOM.IE | Login"
    } );
}

module.exports =  {
    loginView
};