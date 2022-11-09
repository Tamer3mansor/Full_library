const express = require('express');
const routes = require('./Routes/Route')
const cookiesparser = require('cookie-parser')
const {db}= require('./Db/db');
require('dotenv').config();
const app=express();

//middleWare
app.use(express.static('public'));
app.use(express.json())
app.use(cookiesparser());

//engin views
app.set('view engine', 'ejs');
//DataBase
db(process.env.uri)
.then((result) => app.listen(3000,()=>console.log("listen good") ))
.catch((err) => console.log("this connection error" + err));

//roues
app.use('/',routes)
