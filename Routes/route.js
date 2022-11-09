const express = require('express');
const {getALL_books,login_get, signup_get ,login_post ,signup_post,logout_get,addbook_get,addBook_post,b} = require('../controllers/controller')
const {checkuser,requireAuth}=require('../middleware/userMiddle')
const Route = express.Router();
Route.get('*' , checkuser);
Route.get('/',(req,res)=>{res.render('home')})
Route.get('/books',requireAuth,/*(req,res)=>{res.render('books')}*/(getALL_books))
Route.get('/login',(login_get))
Route.get('/signup',(signup_get))
Route.get('/logout',(logout_get))
Route.post('/signup',(signup_post))
Route.post('/login',(login_post))
Route.get('/bookAdd',(addbook_get))
Route.post('/bookAdd',(addBook_post))
Route.delete('/bookRemove',(book_delete))
module.exports = Route;
//signup 
// signup_get