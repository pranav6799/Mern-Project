const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
  name:{
    type:String,
    required:[true,'Please provide your name']
  },
  email:{
    type:String,
    required:[true,'Please provide email id'],
    unique:true
  },
  password:{
    type:String,
    required:[true,'Please provide password'],
  },
  phone:{
    type:Number,
    required:[true,'Please provide contact number'],
  },
  address:{
    type:String,
    required:[true,'Please provide address'],
  },
  answer:{
    type:String,
    required:[true, 'Answer is required']
  },
  role:{
    type:Number,
    default:0 
  }
},{timeStamps:true})


userSchema.pre('save',async function () {
  this.password = await bcrypt.hash(this.password,10)
})

userSchema.methods.comparePassword = async function (candidatePassword,userPassword) {
  return await bcrypt.compare(userPassword,candidatePassword)
}

const User = mongoose.model('User',userSchema)

module.exports = User
