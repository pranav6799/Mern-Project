const Product = require("../Model/productModel");
const slugify = require("slugify");
const fs = require("fs");
const path = require("path");
const errorHandler = require("../util/errorHandler");
const Category = require("../Model/categoryModel");

exports.createProduct = async (req, resp, next) => {
  try {
    const { name, slug, description, price, quantity, shipping } = req.fields;
    const { photo } = req.files;

    const products = new Product({ ...req.fields, slug: slugify(name) });

    console.log(photo);

    products.photo.data = fs.readFileSync(photo.path);
    products.photo.contentType = photo.type;

    await products.save();

    resp.status(201).json({
      status: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, resp, next) => {
  try {
    const { name, description, quantity, price, shipping } = req.fields;

    const { photo } = req.files;

    const products = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );

    console.log(photo);

    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }

    await products.save();
    resp.status(201).json({
      status: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllProducts = async (req, resp, next) => {
  try {
    const products = await Product.find()
      .select("-photo")
      .populate("category")
      .limit(12)
      .sort({ createdAt: -1 });

    resp.status(200).json({
      status: true,
      results: products.length,
      products,
    });
  } catch (err) {
    next(err);
  }
};

exports.getOneProduct = async (req, resp, next) => {
  try {
    const slug = req.params.slug;

    const product = await Product.findOne({ slug })
      .select("-photo")
      .populate("category");

    if (!product) {
      return next(errorHandler(400, "Product not Found"));
    }

    resp.status(200).json({
      status: true,
      message: "Single Product fetched",
      product,
    });
  } catch (err) {
    next(err);
  }
};

exports.productPhoto = async (req, resp, next) => {
  try {
    const product = await Product.findById(req.params.id).select("photo");
    if (product.photo.data) {
      resp.set("Content-Type", product.photo.contentType);
      return resp.status(200).send(product.photo.data);
    }
  } catch (err) {
    next();
  }
};

exports.deleteProduct = async (req, resp, next) => {
  const product = await Product.findByIdAndDelete(req.params.id).select(
    "-photo"
  );

  resp.status(200).json({
    status: true,
    message: "Product Deleted Successfully",
  });
};

exports.productFiltersController = async (req, resp, next) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };

    const products = await Product.find(args);

    resp.status(200).json({
      status: true,
      message: "Products Filtered",
      products,
    });
  } catch (err) {
    next(err);
  }
};

exports.productCount = async (req, resp, next) => {
  try {
    const total = await Product.find().estimatedDocumentCount();

    resp.status(200).json({
      status: true,
      total,
    });
  } catch (err) {
    next(err);
  }
};

exports.productList = async (req, resp, next) => {
  try {
    const perPage = 4;
    const page = req.params.page ? req.params.page : 1;

    const products = await Product.find()
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

    resp.status(200).json({
      status: true,
      products,
    });
  } catch (err) {
    next(err);
  }
};

exports.searchProduct = async (req,resp,next) => {
  try{
    const { keyword } = req.params;

    const results = await Product.find({
      $or: [{ name: { $regex: keyword , $options:'i'} }, { description: { $regex: keyword, $options:'i' } }],
    }).select('-photo')
  
    resp.status(200).json({
      status:true,
      results
    })
  }catch(err){
    next(err)
  }
  
};

exports.getSimilarProduct = async(req,resp,next)=>{

  try{const{pid,cid}= req.params

  const product = await Product.find({
    category:cid,
    _id:{$ne:pid}
  }).select('-photo').limit(3).populate('category')

  resp.status(200).json({
    status:true,
    product
  })
}catch(err){
  console.log(err)
}
  

}

exports.getProductCategory = async(req,resp,next)=>{
  try{
    const category = await Category.findOne(req.params)
    const product = await Product.find({category})
    resp.status(200).json({
      status:true,
      category,
      product
    })
  }catch(err){
    console.log(err)
  } 
}    
