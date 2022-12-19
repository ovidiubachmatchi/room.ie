const indexView = (req, res) => {
    if(req.session.user) {
        res.render("index", {
            title: "ROOM.IE | " + req.session.user.username,
            login: ""
        } );
    }
    res.render("index", {
        title: "ROOM.IE | Home",
        login: "Login"
    } );
}

module.exports =  {
    indexView
};