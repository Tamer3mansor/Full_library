const mongoose = require('mongoose');
const bycript = require('bcrypt');
const { isEmail } =require('validator');
const userSchema = new mongoose.Schema({
  email:{
  type:String,
  require:[true , "This faild is required"],
  unique:[true],
  lowercase:[true],
  validate:[isEmail, "enter vaild email"]
  },
  password:{
    type: String,
    require: [true,"This faild is required"],
    minlength: [6,"Minmum length is 6" ]
  }

});
userSchema.pre('save',async function(next){
  const salt=await bycript.genSalt();
  this.password =await bycript.hash(this.password,salt)  
      next(); 
  });

  userSchema.statics.logIn_auth =async function(email,password){
    let user= await this.findOne({email});
    if(user){
 const password_auth = await bycript.compare(password, user.password);
    if(password_auth)
    {
        return user;
    }
    else{
        throw Error('Incorrect password');
    }
}
    else
    {
        throw Error('Incorrect email');
    }
}
const users = mongoose.model('users',userSchema);
module.exports = users ;
