const mongoose = require('mongoose');
const db= (dbURI)=>{
return mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true });}
module.exports = {db};