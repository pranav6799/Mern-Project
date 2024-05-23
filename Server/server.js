const dotenv = require('dotenv').config()
const express = require('express')
const connectDb = require('./config/db')
const morgan = require('morgan')
const userRouter = require('./Routes/userRoutes')
const cors = require('cors')
const categoryRoute = require('./Routes/categoryRoutes')
const productRoute = require('./Routes/productRoutes')
const cookieParse = require('cookie-parser')

//database connect
connectDb()


//rest Object
const app = express()

//middleware
app.use(cors())
app.use(cookieParse())
app.use(morgan('dev'))
app.use(express.json())

app.use('/api/v1/auth',userRouter)
app.use('/api/v1/category',categoryRoute)
app.use('/api/v1/product',productRoute)


app.use((err,req,resp,next)=> {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal Error Occur'
  return resp.status(statusCode).json({
    status:false,
    message,
    statusCode
  })
})


const port = process.env.PORT || 8080

app.listen(port,()=>{
  console.log(`Server running on ${process.env.DEV_MODE} mode on port ${port}`)
})
