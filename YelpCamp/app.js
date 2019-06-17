const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const result = require('dotenv').config();
if (result.error) {
    throw result.error
}   
//   console.log(result.parsed)
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://'+
    process.env.DB_USER + ':' + process.env.DB_PASS + 
    '@learningcluster-cldnq.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(()=> {
    console.log('connected to mongoDB Atlas!')
}).catch(err => {
    console.log('ERROR:', err.message)
})

var campgrounds = [
    {name: "campsite", image:"https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"},
    {name: "campsite2", image:"https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"},
    {name: "campsite", image:"https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"},
    {name: "campsite2", image:"https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"},
    {name: "campsite", image:"https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"},
    {name: "campsite2", image:"https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"},
    {name: "campsite", image:"https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"},
    {name: "campsite2", image:"https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"},
    {name: "campsite", image:"https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"},
    {name: "campsite2", image:"https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"},
    {name: "campsite", image:"https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"},
    {name: "campsite2", image:"https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"},
    {name: "campsite", image:"https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"},
    {name: "campsite2", image:"https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"},
    {name: "campsite", image:"https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"},
    {name: "campsite2", image:"https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"}
 ];


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", (req,res) => {
    res.render("landing")
});

app.get("/campgrounds", (req,res) => {
   res.render("campgrounds", {campgrounds: campgrounds});
});

app.get("/campgrounds/new", (req,res) => {
    res.render("new.ejs")
});

app.post("/campgrounds", (req,res) => {
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image:image}
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`listening on ${port}`);
});