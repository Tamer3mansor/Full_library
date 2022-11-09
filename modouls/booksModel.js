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
    description:{
        type:String,
        require:[false]
    },
    imge:{
    }
})
const books = mongoose.model('books',bookSchema);
module.exports = books;