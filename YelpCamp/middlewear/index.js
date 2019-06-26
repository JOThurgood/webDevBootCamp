// all the middlewear goes here
const Campground = require("../models/campground");
const Comment = require("../models/comment");
const middlewearObj = {};

// middlewearObj.checkCampgroundOwnership = function (req,res,next) {
//     // logged in?
//     if (req.isAuthenticated()) {
//         Campground.findById(req.params.id, (err, foundCampground) => {
//             if(err) {
//                 req.flash("error", "Campground not found.")
//                 res.redirect("back");
//             } else {
//                 // does the user own the campground
//                 if (foundCampground.author.id.equals(req.user._id)) {
//                     next();
//                 } else{
//                     req.flash("error", "You don't have permission to do that.")
//                     res.redirect("back");
//                 }  
//             }
//         });
//     } else {
//         req.flash("error", "You need to be logged in to do that");
//         res.redirect("/login");
//     }
// }

middlewearObj.checkCampgroundOwnership = function (req, res, next) {
    Campground.findById(req.params.id, function (err, foundCampground) {
        if (err || !foundCampground) {
            console.log(err);
            req.flash('error', 'Sorry, that campground does not exist!');
            res.redirect('/campgrounds');
        } else if (foundCampground.author.id.equals(req.user._id) || req.user.isAdmin) {
            req.campground = foundCampground;
            next();
        } else {
            req.flash('error', 'You don\'t have permission to do that!');
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
}


// middlewearObj.checkCommentOwnership = function (req,res,next) {
//     // logged in?
//     if (req.isAuthenticated()) {
//         Comment.findById(req.params.comment_id, (err, foundComment) => {
//             if(err || !foundComment) {
//                 res.redirect("back");
//             } else {
//                 // does the user own the comment
//                 if (foundComment.author.id.equals(req.user._id)) {
//                     next();
//                 } else {
//                     req.flash("error", "You don't have permission to do that.")
//                     res.redirect("back");
//                 }  
//             }
//         });
//     } else {
//         req.flash("error","You need to be logged in to do that")
//     }
// }

middlewearObj.checkCommentOwnership = function (req, res, next) {
    Comment.findById(req.params.comment_id, function (err, foundComment) {
        if (err || !foundComment) {
            console.log(err);
            req.flash('error', 'Sorry, that comment does not exist!');
            res.redirect('/campgrounds');
        } else if (foundComment.author.id.equals(req.user._id) || req.user.isAdmin) {
            req.comment = foundComment;
            next();
        } else {
            req.flash('error', 'You don\'t have permission to do that!');
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
}

middlewearObj.isLoggedIn = function (req, res, next) {
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash("error","You need to be logged in to do that.");
        res.redirect("/login");
    }
}

module.exports = middlewearObj 