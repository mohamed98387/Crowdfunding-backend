const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const jwtSecret = "secret"
const Project = require("../models/Project")
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator');
const User = require("../models/User")
const multer = require("multer");
//upload image 
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public");
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname.replace(/\s+/g,'-')}`);
    },
    fileFilter: (req, file, cb) => {
      if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
      }
      return cb(null, false, new Error("can not save image"));
    },
  });
  
  var upload = multer({ storage: storage }).single("file");
  
  router.post("/uploadImage", auth, (req, res) => {
    upload(req, res, (err) => {
      if (err) return res.json({ success: false, err });
      return res.json({
        success: true,
        path: res.req.file.path,
        fileName: res.req.file.filename,
      });
    });
  });

  //video

  var storageVideo = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public");
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname.replace(/\s+/g,'-')}`);
    },
    fileFilter: (req, file, cb) => {
      const ext =path.extname(file.originalname)
      if (ext !== '.mp4') {
       return cb(res.status(400).end('only mp4 file is allowed'),false)
      }
      cb(null, true);
    },
  });

  var uploadVideo = multer({ storage: storageVideo }).single("file");
  
  router.post("/uploadVideo", auth, (req, res) => {
    uploadVideo(req, res, (err) => {
      if (err) return res.json({ success: false, err });
      return res.json({
        success: true,
        path: res.req.file.path,
        fileName: res.req.file.filename,
      });
    });
  });

  router.get('/all', auth,(req,res)=>{
    User.find({})
    .then(users=>res.json(users))
    .catch(err=>console.log(err.message))
})
  router.get('/', auth,(req,res)=>{
    User.find({user:req.user.id})
    .then(users=>res.json(users))
    .catch(err=>console.log(err.message))
})
//Register user
router.post('/', [
check("firstname","please enter your first name").not().isEmpty(),
check("lastname","please enter your last name").not().isEmpty(),

],(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }
const{firstname,lastname,email,password,role} = req.body

User.findOne({email})
.then(user=>{
    if(user){
        res.status(400).json({msg:'user already exists'})
    }else{
        user = new User({
            firstname ,//ali amlnalha saisie 
            lastname,
            email,
            password,
            role:0
                })

                //hash password
                bcrypt.genSalt(10,(err,salt)=>{
                    bcrypt.hash(user.password, salt,(err, hashedPassword)=>{
                        user.password =hashedPassword
                        user.save()
                       const payload={
                        user :{
                            id : user.id
                        }
                       }
                      jwt.sign(payload,jwtSecret,{expiresIn:3600000},(err,token)=>{
                        if(err) throw err
                        res.json({token})
                      })

                    })
                })
           
    }
})
.catch(err=>console.log(err.message))
})
router.delete("/admin/:id", (req, res) => {
  User.findById(req.params.id)
    .then((event) => {
      if (!event) {
        return res.json({ msg: "User not find" });
      } else {
        User.findByIdAndDelete(
          req.params.id,
          { useFindAndModify: false },
          (err, data) => {
            res.json({ msg: "User deleted" });
          }
        );
      
      }
    })
    .catch((err) => console.log(err.message));
});





router.put('/:id', auth,(req,res)=>{
    const {firstname,lastname,email,password,pic,cin,phone,country} = req.body
    //build a music object
    let userFields = {}
    if (firstname) userFields.firstname = firstname
    if (lastname) userFields.lastname = lastname
    if (email) userFields.email = email
    if (password) userFields.password = password
    if (pic) userFields.pic = pic
    if (cin) userFields.cin = cin
    if (phone) userFields.phone = phone
    if (country) userFields.country = country
    
 User.findById(req.params.id)
 .then(user=>{
    if(!user){
     return  res.json({msg:"user not found"})
    }else if(user.id.toString() !== req.user.id){
     res.json({msg:'not authorized'})
    }else{
        User.findByIdAndUpdate(req.params.id,{$set:userFields},(err,data)=>{
            res.json({msg:"user updated!"})
           
        })
    }
})
.catch(err=>console.log(err.message))
 
   

})


module.exports = router