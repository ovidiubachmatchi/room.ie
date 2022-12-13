const searchView = (req, res) => {
    res.render("search", {
        title: "Search Page | Room.ie"
    } );
}

module.exports =  {
    searchView
};