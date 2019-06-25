// all the middlewear goes here
const Campground = require("../models/campground");
const Comment = require("../models/comment");
const middlewearObj = {};

middlewearObj.checkCampgroundOwnership = function (req,res,next) {
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


middlewearObj.checkCommentOwnership = function (req,res,next) {
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

middlewearObj.isLoggedIn = function (req, res, next) {
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect("/login");
    }
}

module.exports = middlewearObj 