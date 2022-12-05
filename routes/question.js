const express = require('express');
const router = express.Router();
const Question  = require("../models/Question");

router.post("/saveQuestion", (req, res) => {

    const question = new Question(req.body) 
 
    question.save((err, question ) => {
         if(err) return res.json({ success:false, err})
 
         Question.find({ _id: question._id })
         .populate('writer')
         .populate('createrId')
         .exec((err, result) => {
             if(err) return res.json({ success:false, err })
             return res.status(200).json({ success:true, result })
         })
 
     })});
     router.post("/saveanswerQuestion", (req, res) => {

      const question = new Question(req.body) 
   
      question.save((err, question ) => {
           if(err) return res.json({ success:false, err})
   
           Question.find({ _id: question._id })
           .populate('writer')
           .populate('AskerId')
           
           .populate('IdQuestion')
           .exec((err, result) => {
               if(err) return res.json({ success:false, err })
               return res.status(200).json({ success:true, result })
           })
   
       })});

 router.post("/getMyProjectQuestion", (req, res) => {
    //Need to find all of the Users that I am subscribing to From Subscriber Collection
    Question.find({ createrId: req.body.createrId })
    .populate('writer')
    .populate('projectId')
    .exec((err, questions) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({ success: true, questions });
    });
  });
module.exports = router;