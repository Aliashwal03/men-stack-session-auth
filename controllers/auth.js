const express=require('express')
const User = require('../models/user')
const bcrypt=require('bcrypt')
const router=express.Router()


router.get('/',(req,res)=>{

    res.send('auth is working?')
})

// signup w=view
router.get('/sign-up',(req,res)=>{
    res.render('auth/sign-up.ejs')
})

router.post('/sign-up',async(req,res)=>{

    // checks if the user already exsistes or not
    const userIdatabase= await User.findOne({username:req.body.username})
    if(userIdatabase){
        return res.send('Username already taken')
    }
    // check if the password and the confirm password are the same
    if (req.body.password!==req.body.confirmPassword){
        return res.send('password and confirm password should match')

    }

    // hash password
    const hashedPassword=bcrypt.hashSync(req.body.password,10)
    req.body.password=hashedPassword
    const newUser=await User.create(req.body)
    res.send (`welcome ${newUser.username}`)
})
module.exports=router