const mongoose = require('mongoose')
const bycript = require('bcrypt');

const bookSchema = mongoose.Schema({
    author:{
  type:String,
  require:[true]
    },
    name:{
          type:String,
        require:[true]
    },
    desc:{
        type:String,
        require:[false]
    },
    imge:
    {
        data: Buffer,
        contentType: String
    }
})
const books = mongoose.model('books',bookSchema);
module.exports = books;