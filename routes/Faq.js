const express = require('express');
const router = express.Router();
const Faq  = require("../models/Faq");
router.post("/saveFaq", (req, res) => {

    const faq = new Faq(req.body) 
 
    faq.save((err, answer ) => {
         if(err) return res.json({ success:false, err})
 
         Faq.find({ _id: answer._id })
         .populate('writerQuestion')
         .populate('writerAnswer')
        
         .exec((err, result) => {
             if(err) return res.json({ success:false, err })
             return res.status(200).json({ success:true, result })
         })
 
     })});
     router.post("/getFaq", (req, res) => {
        //Need to find all of the Users that I am subscribing to From Subscriber Collection
        Faq.find({})
        .populate('writerQuestion')
       
        .populate('writerAnswer')
        .exec((err, faq) => {
          if (err) return res.status(400).send(err);
          return res.status(200).json({ success: true, faq });
        });
      });

module.exports = router;