const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const result = require('dotenv').config();
const mongoose = require('mongoose');
const Campground = require("./models/campground");
const Comment = require("./models/comment");
const seedDB = require("./seeds");

// has dotenv configured correctly?
if (result.error) {
    throw result.error
}   
//   console.log(result.parsed)

// Connect mongoose to mongoDB Atlas server
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
// seedDB();

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
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

// New - show form to create new campground
app.get("/campgrounds/new", (req,res) => {
    res.render("campgrounds/new.ejs")
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
    Campground.findById(req.params.id).populate("comments").exec( (err, foundCampground) =>{
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// ==================
// Comments Routes
// ==================

app.get("/campgrounds/:id/comments/new", (req,res) => {
    Campground.findById(req.params.id, (err,campground) => {
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});  
        }
    });

});

app.post("/campgrounds/:id/comments", (req,res) => {
    Campground.findById(req.params.id, (err,campground) => {
        if(err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, (err, comment) => {
                if(err) {
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            })
        }
    });
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`listening on ${port}`);
});