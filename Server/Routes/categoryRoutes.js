const express =require('express')
const categoryController = require('../Controllers/categoryController')
const authController = require('../Controllers/authController')

const router = express.Router()


router.post('/create-category', authController.protect,authController.isAdmin,categoryController.createCategory)
router.patch('/update-category/:id',authController.protect,authController.isAdmin,categoryController.updateCategory)
router.get('/get-all-category',categoryController.getAllCategory)
router.get('/get-category/:slug',authController.protect,categoryController.getOneCategory)
router.delete('/delete-category/:id',authController.protect,authController.isAdmin,categoryController.deleteCategory)

module.exports = router
