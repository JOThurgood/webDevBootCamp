const express = require("express");
const router = express.Router({mergeParams: true});
const Campground    = require("../models/campground");

// Index - show all campgrounds
router.get("/", (req,res) => {
    Campground.find({}, (err,allCampgrounds) => {
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

// New - show form to create new campground
router.get("/new", isLoggedIn, (req,res) => {
    res.render("campgrounds/new.ejs")
});

// Create - add new campground to database
router.post("/", isLoggedIn, (req,res) => {
    var name = req.body.name;
    var image = req.body.image;
    const description = req.body.description;
    const author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, image:image, description: description, author: author}
    Campground.create(newCampground, (err, newlyCreated)=> {
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

// Show - info about a specific campsite
router.get("/:id", (req,res) => {
    Campground.findById(req.params.id).populate("comments").exec( (err, foundCampground) =>{
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// Edit
router.get("/:id/edit", checkCampgroundOwnership, (req,res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

// Update
router.put("/:id", checkCampgroundOwnership, (req,res) => {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// Destroy
router.delete("/:id", checkCampgroundOwnership, (req,res) => {
    Campground.findByIdAndRemove(req.params.id, err => {
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});

// middlewear

// is logged in? 

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect("/login");
    }
}

// is authenticated? 
function checkCampgroundOwnership (req,res,next) {
    // logged in?
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, (err, foundCampground) => {
            if(err) {
                res.redirect("back");
            } else {
                // does the user own the campground
                if (foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else{
                    res.redirect("back");
                }  
            }
        });
    } else {
        res.send("You need to be logged in to do that")
    }
}

module.exports = router;