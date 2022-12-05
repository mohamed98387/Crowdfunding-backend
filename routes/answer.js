const express = require('express');
const router = express.Router();
const Answer  = require("../models/Answer");


     router.post("/saveanswerQuestion", (req, res) => {

      const answer = new Answer(req.body) 
   
      answer.save((err, answer ) => {
           if(err) return res.json({ success:false, err})
   
           Answer.find({ _id: answer._id })
           .populate('writer')
           .populate('AskerId')
           .populate('IdQuestion')
           .exec((err, result) => {
               if(err) return res.json({ success:false, err })
               return res.status(200).json({ success:true, result })
           })
   
       })});

 router.post("/getAnswers", (req, res) => {
    //Need to find all of the Users that I am subscribing to From Subscriber Collection
    Answer.find({})
   
    .exec((err, answer) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({ success: true, answer });
    });
  });
module.exports = router;