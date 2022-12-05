const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const jwtSecret = "secret"
const { check, validationResult } = require('express-validator');
const User = require("../models/User")
const auth = require("../middleware/auth")
//get the user logged in 
router.get('/', auth,(req,res)=>{
    User.findById(req.user.id)
         .then(user=>res.json(user))
         .catch(err=>console.log(err.message))


})
//login the user and get the token
router.post('/',(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }
    const {email,password}=req.body
    User.findOne({email})
    .then(user=>{
        if(!user){
            //check if user exist
            return res.status(400).json({msg:"Please Register before!"})
         } else{
           //Compare password
           bcrypt.compare(password,user.password, (err, isMatch)=>{
            if(err){
                console.log(err.message)
            }else if (isMatch){
                const payload={
                    user :{
                        id : user.id
                    }
                   }
                  jwt.sign(payload,jwtSecret,{expiresIn:3600000},(err,token)=>{
                    if(err) throw err
                    res.json({token})
                  })
            }else{


                return res.status(400).json({msg:"Wrong Password"})
            }



           })
            }
        })
        .catch(err=>console.log(err.message))
})

module.exports = router