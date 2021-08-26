const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/web');
const bodyparser = require('body-parser');
const path = require('path')

const app = express(); 
mongoose.set('useFindAndModify', false);
app.use(bodyparser.urlencoded({
    extended: true
  }));
app.use(express.json());

app.set('view engine', 'ejs');



app.use('/', router);

mongoose.connect('mongodb://localhost:27017/testdb',
 {useNewUrlParsar:true},
 () => console.log("connected")
); 
 
app.listen(3000);
