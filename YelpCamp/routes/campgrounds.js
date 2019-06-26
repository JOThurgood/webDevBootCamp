const express = require("express");
const router = express.Router({mergeParams: true});
const Campground    = require("../models/campground");
const middlewear = require("../middlewear");

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
router.get("/new", middlewear.isLoggedIn, (req,res) => {
    res.render("campgrounds/new.ejs")
});

// Create - add new campground to database
router.post("/", middlewear.isLoggedIn, (req,res) => {
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
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// Edit
router.get("/:id/edit", middlewear.checkCampgroundOwnership, (req,res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

// Update
router.put("/:id", middlewear.checkCampgroundOwnership, (req,res) => {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// Destroy
router.delete("/:id", middlewear.checkCampgroundOwnership, (req,res) => {
    Campground.findByIdAndRemove(req.params.id, err => {
        if(err){
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "campground deleted")
            res.redirect("/campgrounds");
        }
    });
});


module.exports = router;