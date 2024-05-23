const express = require('express')
const authController = require('../Controllers/authController')
const userController = require('../Controllers/userController')

const router = express.Router()


router.post('/register',authController.register)
router.post('/login',authController.login)
router.post('/forget-password',authController.forgetPassword)
router.get('/user-auth',authController.protect,(req,resp)=>{
  resp.status(200).send({ok:true})
})

router.get('/admin-auth',authController.protect,authController.isAdmin,(req,resp)=>{
  resp.status(200).send({ok:true})
})

module.exports = router
