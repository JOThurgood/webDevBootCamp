const express       = require("express");
const app           = express();
const bodyParser    = require("body-parser");
const result        = require('dotenv').config();
const mongoose      = require('mongoose');
const passport      = require("passport");
const LocalStrategy = require("passport-local");
const Campground    = require("./models/campground");
const Comment       = require("./models/comment");
const User          = require("./models/user");
const seedDB        = require("./seeds");

const commentRoutes     = require("./routes/comments");
const campgroundRoutes  = require("./routes/campgrounds");
const indexRoutes       = require("./routes/index");

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
app.use(express.static(__dirname + "/public"))

// delete and seed the DB for some dummy data if necessary
// seedDB();

// Passport Config
app.use(require("express-session")({
    secret: process.env.MYSECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// middlewear to pass currentUser to all views
app.use((req,res,next) => {
    res.locals.currentUser = req.user;
    next();
});

app.use("/",indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`listening on ${port}`);
});