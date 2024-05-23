const mongoose = require('mongoose')


const categorySchema = mongoose.Schema({
  name:{
    type:String,
    require:[true,'Name is required'],
    unique:true
  },
  slug:{
    type:String,
    lowercase:true
  }
})

const Category = mongoose.model('Category',categorySchema)

module.exports = Category
