const indexView = (req, res) => {
    res.render("index", {
        title: "ROOM.IE | Home"
    } );
}

module.exports =  {
    indexView
};