const express = require("express");
const app = express();
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');

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

app.get("/", (req,res)=>{
    res.render("home");
});

app.get("/secret", (req,res) =>{
    res.render("secret");
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`listening on ${port}`);
});