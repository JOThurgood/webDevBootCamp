const express = require("express");
const app = express();
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const passport = require("passport");
const bodyParser = require("body-parser");
const User = require("./models/user");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");

// has dotenv configured correctly?
if (dotenv.error) {
    throw dotenv.error
}   
//   console.log(dotenv.parsed)

// Connect mongoose to mongoDB Atlas server
mongoose.connect('mongodb+srv://'+
    process.env.DB_USER + ':' + process.env.DB_PASS + 
    '@learningcluster-cldnq.mongodb.net/auth_test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(()=> {
    console.log('connected to mongoDB Atlas!')
}).catch(err => {
    console.log('ERROR:', err.message)
})

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.use(require("express-session")({
    secret: process.env.MYSECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes

app.get("/", (req,res)=>{
    res.render("home");
});

app.get("/secret", isLoggedIn, (req,res) =>{
    res.render("secret");
});

// Auth Routes

app.get("/register", (req,res) => {
    res.render("register");
});

app.post("/register", (req,res) => {
    User.register(new User({username: req.body.username}), req.body.password, (err, user)=> {
        if(err){
            console.log(err);
            res.render('register');
        } else{
            passport.authenticate("local")(req, res, () => {
                res.redirect("/secret");
            });
        }
    });
});

// Login Routes

app.get("/login", (req,res) => {
    res.render("login");
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), (req, res) => {
});

// Logout Route

app.get("/logout", (req,res) => {
    req.logout();
    res.redirect("/")
});

// is logged in middlewear

function isLoggedIn(req, res, next){
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

// Listen

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`listening on ${port}`);
});