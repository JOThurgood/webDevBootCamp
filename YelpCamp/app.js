var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", (req,res) => {
    res.render("landing")
});


const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`listening on ${port}`);
});