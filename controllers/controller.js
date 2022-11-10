const users=require('../modouls/userModel')
const books = require('../modouls/booksModel')
const jwt=require('jsonwebtoken');
const handelerErrors = (err) =>{
    // console.log(err.message ,err.code);
    let error = {email:'',password:''};
    //handel error code
    if(err.message=='incorrect email')
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
        const customerror = handelerErrors(error);
        res.status(400).json({customerror});
    }

}
signup_post = async (req,res)=>{
    const { email , password} = req.body;
    try {
     const User = await users.create({email , password}); // it a sync return promise
     const token = creattoken(User._id);
     res.cookie('jwt',token,{httpOnly:true, maxAge:3*24*60*60*1000  })
     res.status(201).json({user:User._id});
    } catch (err) {
    const errors =handelerErrors(err);
    res.status(400).json({errors});
    }
}
logout_get = (req,res)=>{
res.cookie('jwt'," ",{maxAge:1});
res.redirect('/');
}
addbook_get = (req,res)=>{
 res.render('bookadd')
}
addBook_post = async(req,res)=>{
    const { author , name , desc , image} = req.body;
    console.log(req.body);
    try {
    const book = await books.create({ author , name , desc , image}); 
     res.status(201).json({book});
    } catch (err) {
   
    res.status(400).json(err);
    }
}
getALL_books =async(req,res)=>{
    try {
        const allBooks = await books.find({});
        // console.log(allBooks[3].desc);
        res.render('books', {data : allBooks});
        // res.status(201).json(allBooks);
    } catch (error) {
        // res.status(400).json(error)
    }
    
}
getAdmin_books =async(req,res)=>{
    try {
        const allBooks = await books.find({});
        // console.log(allBooks.name);
        res.render('adminBookview', {data : allBooks});
        // res.status(201).json(allBooks);
    } catch (error) {
        res.status(400).json(error)
    }
    
}
book_delete=async (req,res)=>{
    console.log(req.params);
    try{
        const ide  = req.params.id
        const book = await books.findOneAndDelete({ ide })
        if (!book) {
          return res.status(404).json({msg:`No task with id:${ide}`})
        }
        res.status(200).json({ book })
      } catch(error)
      {
      res.status(500).json( req.body.id)
      }
}
module.exports = {
    signup_get,signup_post ,getAdmin_books, login_get , login_post ,logout_get,addbook_get,addBook_post,book_delete,getALL_books
}