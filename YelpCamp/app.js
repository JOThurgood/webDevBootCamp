const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const result = require('dotenv').config();
const mongoose = require('mongoose');
const Campground = require("./models/campground");
const seedDB = require("./seeds");

// has dotenv configured correctly?
if (result.error) {
    throw result.error
}   
//   console.log(result.parsed)

// Connect Mongoose to mongoDB Atlas server
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



// setup the view engine
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// delete and seed the DB
seedDB();

// Routes

// Landing page
app.get("/", (req,res) => {
    res.render("landing")
});

// Index - show all campgrounds
app.get("/campgrounds", (req,res) => {
    Campground.find({}, (err,allCampgrounds) => {
        if(err){
            console.log(err);
        } else {
            res.render("index", {campgrounds: allCampgrounds});
        }
    });
});

// New - show form to create new campground
app.get("/campgrounds/new", (req,res) => {
    res.render("new.ejs")
});

// Create - add new campground to database
app.post("/campgrounds", (req,res) => {
    var name = req.body.name;
    var image = req.body.image;
    const description = req.body.description;
    var newCampground = {name: name, image:image, description: description}
    Campground.create(newCampground, (err, newlyCreated)=> {
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

// Show - info about a specific campsite
app.get("/campgrounds/:id", (req,res) => {
    Campground.findById(req.params.id, (err, foundCampground) =>{
        if(err){
            console.log(err);
        } else {
            res.render("show", {campground: foundCampground});
        }
    });
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`listening on ${port}`);
});