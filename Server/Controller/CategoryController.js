
const Category = require('../Model/categoryModel')
const errorHandler = require('../util/errorHandler')
const slugify = require('slugify')


exports.createCategory=async(req,resp,next)=>{
  try{
    const {name}= req.body

    const category = await Category.findOne({name})
  
  if(category){
    return next(errorHandler(404,'Category Already Exist'))
  }
  
  const newCategory = await Category.create({name,slug:slugify(name)})
  
  resp.status(200).json({
    status:true,
    message:'Create New Category Successfully',
    newCategory
  })
  }catch(err){
    next(err)
  }

}


exports.updateCategory = async(req,resp,next)=>{
  try{
    const {name} = req.body
  const id = req.params.id

  const category = await Category.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})

  resp.status(200).json({
    status:true,
    message:'Update Successfully',
    category
  })
  }catch(err){
    next(err)
  }
  
}

exports.getAllCategory = async(req,resp,next)=>{
  try{
    
  const category = await Category.find()

  if(!category){
    return next(errorHandler(404,'No Categories Found'))
  }

  resp.status(200).json({
    status:true,
    message:'Get All Categories Successfully',
    category
  })
  }catch(err){
    next(err)
  }

}


exports.getOneCategory = async(req,resp,next)=>{
  try{
    

  const category = await Category.findOne({slug:req.params.slug})
  if(!category){
    return next(errorHandler(404,'Category not Found'))
  }

  resp.status(200).json({
    status:true,
    message:'Get Single Category Successfully',
    category
  })
  }catch(err){
    next()
  }
}


exports.deleteCategory = async(req,resp,next)=>{
try{
  await Category.findByIdAndDelete(req.params.id)
  resp.status(200).json({
    status:true,
    message:'Category Deleted Successfully'
  })
}catch(err){
  next(err)
}
} 
