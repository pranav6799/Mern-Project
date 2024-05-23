const User = require('../Model/userModel')
const JWT = require('jsonwebtoken')
const {promisify} = require('util')
const bcrypt = require('bcrypt')

const errorHandler = require('../util/errorHandler')

exports.register = async(req,resp,next)=>{
  try{
  const {name,phone,email,password,address} = req.body

  const user = await User.findOne({email})
  if(user){
    return next(errorHandler(400,'User Already Registered Kindly Login'))
  }

  const newUser = await User.create(req.body)

  resp.status(200).json({
    status:'success',
    message:'User registered Successfully',
    newUser
  })
}catch(error){
  next(error)
}
}


exports.login=async (req,resp,next)=>{
  const {email,password} = req.body

  const user = await User.findOne({email})
  if(!user){
    return next(errorHandler(404,'User not found kindly Sign Up'))
  }

  const match = await user.comparePassword(user.password,password)
  if(!match){
    return next(errorHandler(400,'Inavlid Email or password'))
  }

  const token = JWT.sign({id:user._id},process.env.SECRET_KEY,{expiresIn:'1d'})


  resp.cookie('token',token).status(200).json({
    status:true,
    message:'User Logged in Successfully',
    token,
    user:{
      name:user.name,
      email:user.email,
      phone:user.phone,
      address:user.address,
      role:user.role
    }
  })

  
}




exports.protect = async(req,resp,next)=>{
  try{
let token;

if(req.headers.authorization && req.headers.authorization){
   token = req.headers.authorization
}



if(!token){
  return next(errorHandler(404,'Kindly login to access'))

}


const decode = await promisify(JWT.verify)(token,process.env.SECRET_KEY)
if(!decode){
  return next(errorHandler(404,'Token expire kindly login again'))
}

const freshUser = await User.findById(decode.id)
if(!freshUser) {
  return next(errorHandler(404,'User not found'))
}

req.user = freshUser 

next()
  }catch(err){
    next(err)
  }

}



exports.forgetPassword = async (req,resp,next)=>{
try{const {email,newPassword,answer} = req.body

const user = await User.findOne({email,answer})

if(!user){
  return next(errorHandler(404,'Wrong Email or Answer'))
}

const hashPassword = await bcrypt.hash(newPassword,10)

await User.findByIdAndUpdate(user.id,{password:hashPassword})

resp.status(200).json({
  status:'success',
  message:'Password reset successfully'
})
}catch(err){
  next(err)
}


}

exports.isAdmin =(req,resp,next)=>{
if(req.user.role !== 1){
  return next(errorHandler(400,'Unauthorize Access'))
}else{
  next()
}
