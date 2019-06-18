const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const result = require('dotenv').config();
const mongoose = require("mongoose")


// has dotenv configured correctly?
if (result.error) {
    throw result.error
}   

// Connect Mongoose to mongoDB Atlas server
mongoose.connect('mongodb+srv://'+
    process.env.DB_USER + ':' + process.env.DB_PASS + 
    '@learningcluster-cldnq.mongodb.net/blogapp?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(()=> {
    console.log('connected to mongoDB Atlas!')
}).catch(err => {
    console.log('ERROR:', err.message)
})

// setup view engine, static dir, body parser 
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// schema setup and model config
const blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});
const Blog = mongoose.model("Blog", blogSchema);

// // Create dummy data
// Blog.create({
//     title: "Test Blog",
//     image: "https://images.unsplash.com/photo-1558981420-c532902e58b4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
//     body: "This is the test blog body text. Blah blah blah!"
// })

// // drop the collection (DANGEROUS - DELETE ALL)
//Campground.collection.drop();

// RESTful routes

app.get("/", (req,res) => {
    res.redirect("/blogs")
})

// index
app.get("/blogs", (req,res) => {
    Blog.find({}, (err,blogs) => {
        if(err){
            console.log("error");
        } else {
            res.render("index", {blogs: blogs});
        }
    });
});

// new
app.get("/blogs/new", (req,res) => {
    res.render("new");
});

// create
app.post("/blogs", (req,res) => {
    Blog.create(req.body.blog, (err, newBlog) => {
        if(err){
            res.render("new");
            console.log("create error");
        } else {
            res.redirect("/blogs");
        }
    });
});

// show
app.get("/blogs/:id", (req,res) => {
    Blog.findById(req.params.id, (err, foundBlog) =>{
        if(err){
            redirect("/blogs");
        } else {
            res.render("show", {blog: foundBlog});
        }
    });
});

// listen
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});