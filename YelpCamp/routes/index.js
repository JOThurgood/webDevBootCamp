const express   = require("express");
const router    = express.Router();
const passport  = require("passport");
const User      = require("../models/user");

// Landing page
router.get("/", (req,res) => {
    res.render("landing")
});

// auth routes

router.get("/register", (req,res) => {
    res.render("register");
})

router.post("/register", (req,res) => {
    const newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err,user) => {
        if (err) {
            console.log(err)
            req.flash("error", err.message);
            return res.redirect("register");
        } else {
            passport.authenticate("local")(req,res, ()=> {
                console.log("registered new user")
                req.flash("success","Sign up successfull, welcome to YelpCamp " + user.username + "!!!")
                res.redirect("/campgrounds");
            });
        }
    });
})

// Login Routes

router.get("/login", (req,res) => {
    req.flash("success","Logged in.");
    res.render("login");
});

router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds", 
        failureRedirect: "/login"
    }), (req,res) => {
        // empty callback, don't actually have to have it typed out as the third argument
});

// Logout Route

router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success","Logged out.");
    res.redirect("/campgrounds");
})

// // is logged in? middlewear

// function isLoggedIn(req, res, next) {
//     if(req.isAuthenticated()){
//         return next();
//     } else {
//         res.redirect("/login");
//     }
// }

module.exports = router;