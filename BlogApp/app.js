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

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`listening on ${port}`);
});