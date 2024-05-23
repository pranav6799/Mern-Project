const express = require('express')
const productController = require('../Controllers/productController')
const authController = require('../Controllers/authController')
const formidable = require('express-formidable')

const router = express.Router()


router.post('/create-product',authController.protect,authController.isAdmin,formidable(),productController.createProduct)

router.patch('/update-product/:id',authController.protect,authController.isAdmin,formidable(),productController.updateProduct)

router.get('/get-products',productController.getAllProducts)
router.get('/get-one-product/:slug',productController.getOneProduct)
router.get('/product-photo/:id',productController.productPhoto)
router.delete('/product-delete/:id',productController.deleteProduct)
router.post('/product-filter',productController.productFiltersController)
router.get('/product-count',productController.productCount)
router.get('/product-list/:page',productController.productList)
router.get('/search/:keyword',productController.searchProduct)
router.get('/similar-product/:pid/:cid',productController.getSimilarProduct)
router.get('/product-category/:slug',productController.getProductCategory)



module.exports = router 

