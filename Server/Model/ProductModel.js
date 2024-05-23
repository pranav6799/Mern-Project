const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
  name:{
    type:String,
    require:[true,'Name is required']
  },
  slug:{
    type:String,
    // required:[true,'Slug is required']
  },
  description:{
    type:String,
    required:[true,'Description is required']
  },
  category:{
    type:mongoose.ObjectId,
    ref:'Category',
    required:[true,'Category is required']
  },
  price:{
    type:Number,
    required:[true,'Price is required']
  },
  quantity:{
    type:Number,
    required:[true,'Quantity is required']
  },
  photo:{
    data:Buffer,
    contentType:String,
  },
  shipping:{
    type:String
  }
},{timestamps:true})

const Product = mongoose.model('Product',productSchema)

module.exports = Product
