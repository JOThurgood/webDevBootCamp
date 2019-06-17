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
    '@learningcluster-cldnq.mongodb.net/yelp_camp?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(()=> {
    console.log('connected to mongoDB Atlas!')
}).catch(err => {
    console.log('ERROR:', err.message)
})

// Schema setup

const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

const Campground = mongoose.model("Campground", campgroundSchema)

// Use this to create a dummy campsite without using the create form
// Campground.create(
//     {
//         name: "campsite", image:"https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"
//     }, (err, campground) => {
//         if(err){
//             console.log(err);
//         } else {
//             console.log("newly created campground");
//             console.log(campground);
//         }
//     }
// );

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", (req,res) => {
    res.render("landing")
});

app.get("/campgrounds", (req,res) => {
    // get all campgrounds from DB
    Campground.find({}, (err,allCampgrounds) => {
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds", {campgrounds: allCampgrounds});
        }
    });
});

app.get("/campgrounds/new", (req,res) => {
    res.render("new.ejs")
});

app.post("/campgrounds", (req,res) => {
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image:image}
    // campgrounds.push(newCampground);
    // create new and save to DB
    Campground.create(newCampground, (err, newlyCreated)=> {
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`listening on ${port}`);
});