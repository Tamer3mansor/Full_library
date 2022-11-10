const jwt = require("jsonwebtoken");
const usermodel = require("../modouls/userModel");
const books = require("../modouls/booksModel");
//check in cookies or not
const requireAuth =  (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "tamer secret", async (err, mytoken) => {
      if (err) {
        res.redirect("/login");
      } else {
        let user = await usermodel.findById(mytoken.id);
        let mail = user.email;
        console.log(user.email);
        if (req.path!='/admin'&&mail == "tamermansor371@gmail.com") {
          // if()
          res.redirect("/admin");
          res.locals.user = user;
        }
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

const checkuser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "tamer secret", async (err, token) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await usermodel.findById(token.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

// const checkAdmain=(req,res,next)=>{
//  const token =req.cookies.jwt;
// if(token){
// jwt.verify(token,'tamer secret',async(err,token)=>{
//     if(err)
//     {
//         res.locals.user = null;
//         res.redirect('/login')
//       next();
//     } else{
//         let user= await usermodel.findById(token.id);
//         let mail=user.email;
//         console.log(user.email);
//         if(mail=='tamermansor371@gmail.com'){
//         res.redirect('/bookadd')
//         res.locals.user = user;
//     }
//         next();
//     }

// })
// } else
// {
//     res.locals.user=null;
//     next();
// }
// }
module.exports = { requireAuth, checkuser };
