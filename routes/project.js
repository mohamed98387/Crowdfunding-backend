const express = require("express")
const router = express.Router()

const Project = require("../models/Project")
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator');
router.get('/all',(req,res)=>{
    Project.find({})
    .then(projects=>res.json(projects))
    .catch(err=>console.log(err.message))
})
//get the user logged in 
//Private route
router.get('/', auth,(req,res)=>{
    Project.find({user:req.user.id})
    .then(projects=>res.json(projects))
    .catch(err=>console.log(err.message))
})
//login the user and get the token
//Private route
router.post('/', [auth,[
    
        
        check("category","category is required").not().isEmpty(),
        check("subCategory","subCategory is required").not().isEmpty(),
  
    
     
]],(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }
    const {title,category,subCategory,location,Img,video,objective,dateLaunche,Duration,Reward} = req.body
    const newProject= new Project({
        title,
        category,
        subCategory,
        location,
        Img,
        video,
        objective,
        dateLaunche,
        Duration,
        Reward,
        user:req.user.id
        
    })
    newProject.save()
    .then(song =>res.json(song))
    .catch(err=>console.log(err.message))
})
//update project
//Private route
router.put('/:id', auth,(req,res)=>{
    const {title,category,subCategory,location,Img,video,objective,dateLaunche,Duration,Reward,Presentation
    ,picture,smallDescription,Risks} = req.body
    //build a music object
    let projectFields = {}
    if (title) projectFields.title = title
    if (Risks) projectFields.Risks = Risks
    if (category) projectFields.category = category
    if (subCategory) projectFields.subCategory = subCategory
    if (location) projectFields.location = location
    if (Img) projectFields.Img = Img
    if (video) projectFields.video = video
    if (objective) projectFields.objective = objective
    if (dateLaunche) projectFields.dateLaunche = dateLaunche
    if (Duration) projectFields.Duration = Duration
    if (Reward) projectFields.Reward = Reward
    if (Presentation) projectFields.Presentation = Presentation
    if (picture) projectFields.picture = picture
    if (smallDescription) projectFields.smallDescription = smallDescription
    Project.findById(req.params.id)
    .then(project=>{
        if(!project){
         return  res.json({msg:"project not found"})
        }else if(project.user.toString() !== req.user.id){
         res.json({msg:'not authorized'})
        }else{
            Project.findByIdAndUpdate(req.params.id,{$set:projectFields},(err,data)=>{
                res.json({msg:"Project updated!"})
            })
        }
    })
.catch(err=>console.log(err.message))
})

//delete project
//Private route
router.delete('/:id', auth,(req,res)=>{
    Project.findById(req.params.id)
    .then(project=>{
        if(!project){
         return  res.json({msg:"project not found"})
        }else if(project.user.toString() !== req.user.id){
         res.json({msg:'not authorized'})
        }else{
            Project.findByIdAndDelete(req.params.id,(err,data)=>{
                res.json({msg:"Project deleted!"})
            })
        }
    })
    .catch(err=>console.log(err.message))
})

router.delete("/admin/:id", (req, res) => {
    Project.findById(req.params.id)
      .then((event) => {
        if (!event) {
          return res.json({ msg: "event not find" });
        } else {
            Project.findByIdAndDelete(
            req.params.id,
            { useFindAndModify: false },
            (err, data) => {
              res.json({ msg: "event deleted" });
            }
          );
        }
      })
      .catch((err) => console.log(err.message));
  });
/////
router.put('/reward/:id', auth,(req,res)=>{
    const {Reward} = req.body
    //build a music object
    let projectFields = {}
 
    if (Reward) projectFields.Reward = Reward
    
    Project.findById(req.params.id)
    .then(project=>{
        if(!project){
         return  res.json({msg:"project not found"})
        }else if(project.user.toString() !== req.user.id){
         res.json({msg:'not authorized'})
        }else{
            Project.findByIdAndUpdate(req.params.id,{$push:projectFields},(err,data)=>{
                res.json({msg:"Project updated!"})
            })
        }
    })
.catch(err=>console.log(err.message))
})
router.put('/presentation/:id', auth,(req,res)=>{
    const {Presentation} = req.body
    //build a music object
    let projectFields = {}
 
    if (Presentation) projectFields.Presentation = Presentation
    
    Project.findById(req.params.id)
    .then(project=>{
        if(!project){
         return  res.json({msg:"project not found"})
        }else if(project.user.toString() !== req.user.id){
         res.json({msg:'not authorized'})
        }else{
            Project.findByIdAndUpdate(req.params.id,{$push:projectFields},(err,data)=>{
                res.json({msg:"Project updated!"})
            })
        }
    })
.catch(err=>console.log(err.message))
})
router.put(
    "/validation/:id",
    auth,
  
    (req, res) => {
      const { validation } = req.body;
      let projectFields = {};
      //build a event object
      projectFields.validation = validation;
      Project.findById(req.params.id)
        .then((event) => {
          if (!event) {
            return res.json({ msg: "Project not find" });
          } else {
            Project.findByIdAndUpdate(
              req.params.id,
              { $set: projectFields },
              { useFindAndModify: false },
              (err, data) => {
                res.json({ msg: "Project updated" });
              }
            );
          }
        })
        .catch((err) => console.log(err.message));
    }
  );
  

module.exports = router