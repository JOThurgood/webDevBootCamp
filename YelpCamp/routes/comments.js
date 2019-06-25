const express = require("express");
const router = express.Router({mergeParams: true});
const Campground    = require("../models/campground");
const Comment       = require("../models/comment");

router.get("/new", isLoggedIn, (req,res) => {
    Campground.findById(req.params.id, (err,campground) => {
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});  
        }
    });

});

router.post("/", isLoggedIn, (req,res) => {
    Campground.findById(req.params.id, (err,campground) => {
        if(err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, (err, comment) => {
                if(err) {
                    console.log(err);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            })
        }
    });
});

router.get("/:comment_id/edit", checkCommentOwnership, (req,res) => {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
        if(err) {
            res.redirect("back");
        } else {
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    })
    
});

router.put("/:comment_id", checkCommentOwnership, (req,res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

router.delete("/:comment_id", checkCommentOwnership, (req,res) => {
    Comment.findByIdAndRemove(req.params.comment_id, err => {
        if(err){
            res.redirect("back");
        } else {
            res.redirect("back");
        }
    });
});

// middlewear

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect("/login");
    }
}

function checkCommentOwnership (req,res,next) {
    // logged in?
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if(err) {
                res.redirect("back");
            } else {
                // does the user own the comment
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back");
                }  
            }
        });
    } else {
        res.send("You need to be logged in to do that")
    }
}
module.exports = router;