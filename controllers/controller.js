const users=require('../modouls/userModel')
const books = require('../modouls/booksModel')
const jwt=require('jsonwebtoken');
const errorHandel=(err)=>{
let error = {email:'',password:''};
if(err.message=='Incorrect email')
{
    error.email='this email is not registed';

}
if(err.message=='incorrect password')
{
  error.password='this password is incorrect';
}
if (err.code==11000)
{
error.email='email already registerd'
return error;
}
if(err.message.includes('user validation failed')){
    Object.values(err.errors).forEach(({properties}) => {
      error[properties.path] = properties.message;
    });
   // console.log(Object.values(err.errors));
   }
   return error;
}

const creatToken = (id)=>{
    
    return jwt.sign({id} , 'tamer secret' ,{expiresIn:4*24*60*60});
}

login_get = (req,res)=>{ res.render('login');}
signup_get = (req,res)=>{res.render('signup');}
login_post = async(req,res)=>{
    const {email,password}=req.body;
    try {
    const local_user= await users.logIn_auth(email,password);
    const token = creatToken(local_user._id);
    res.cookie('jwt',token,{httpOnly:true , maxAge:3*24*60*60*1000});
    res.status(201).json({user:local_user._id});
    } catch (error) {
        const customerror = errorHandel(error);
        res.status(400).json({customerror});
    }

}
signup_post = async(req,res)=>{
    const { email , password} = req.body;
    try {
    const local_user = await users.create({email , password}); // it a sync return promise
    const token=creatToken(User._id);
     res.cookie('jwt',token,{httpOnly:true , maxAge:3*24*60*60*1000})    
     res.status(201).json({user:local_user._id});
    } catch (error) {
   
        const customerror = errorHandel(error);
        res.status(400).json({customerror});
    }
    
}
logout_get = (req,res)=>{

}
addbook_get = (req,res)=>{
 res.render('bookadd')
}
addBook_post = async(req,res)=>{
    const { author , name , description , imge} = req.body;
    console.log(req.body);
    try {
    const book = await books.create({ author , name , description , imge}); 
     res.status(201).json({book});
    } catch (err) {
   
    res.status(400).json(err);
    }
}
getALL_books =async(req,res)=>{
    try {
        const allBooks = await books.find({});
        // console.log(allBooks.name);
        res.render('books', {data : allBooks});
        // res.status(201).json(allBooks);
    } catch (error) {
        res.status(400).json(error)
    }
    
}
book_delete= (req,res)=>{

}
module.exports = {
    signup_get,signup_post , login_get , login_post ,logout_get,addbook_get,addBook_post,book_delete,getALL_books
}