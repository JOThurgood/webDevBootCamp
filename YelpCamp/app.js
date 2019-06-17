var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", (req,res) => {
    res.render("landing")
});

app.get("/campgrounds", (req,res) => {
   var campgrounds = [
       {name: "campsite", image:"https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"},
       {name: "campsite2", image:"https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"}
    ];

   res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", (req,res) => {
    res.send("you hit the post route")
    // get data from form and add to campground array
    // redirect back to campgrounds page
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`listening on ${port}`);
});