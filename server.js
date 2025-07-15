require('dotenv').config()
const express=require('express')
const app=express()
const mongoose=require('mongoose')
const methodOverride=require('method-override')
const morgan = require('morgan')
const port=process.env.PORT? process.env.PORT:'3000'

//DB connection
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected',()=>{

    console.log(`connected to mongooDB ${mongoose.connection.name}`)
})

// Middleware
app.use (express.urlencoded({extended:false}))
app.use(methodOverride('_method'))
app.use(morgan('dev'))

app.get('/',(req,res)=>{

    res.render('index.ejs')
})
app.listen(port,()=>{
console.log(`the express is ready on port ${port}`)
})
