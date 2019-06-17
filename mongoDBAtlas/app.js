const express = require('express');
const app = express();
const mongoose = require('mongoose');

const result = require('dotenv').config();
// if (result.error) {
//     throw result.error
//   }
   
//   console.log(result.parsed)

mongoose.connect('mongodb+srv://'+
    process.env.DB_USER + ':' + process.env.DB_PASS + 
    '@learningcluster-cldnq.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(()=> {
    console.log('connected to DB!')
}).catch(err => {
    console.log('ERROR:', err.message)
})

app.get('/', (req,res) => {
    res.send('Is this thing on?')
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`listening on ${port}`);
});