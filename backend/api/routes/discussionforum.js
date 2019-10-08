// Developed By Ajith Jayanthi B00825322 aj788769@dal.ca
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const forum = require('../models/forum');

router.post('/', (req, res, next) => {
    const discussionModel= new forum({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,
        image:req.body.image,
        time:req.body.time,
        repliesCount:req.body.repliesCount,
        uid: req.body.uid,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });
    discussionModel.save().then(result =>{
    })
    .catch(err => console.log(err));
    res.status(201).json({
        message: "Forum data inserted!",
    });

});

router.get('/discussionforums', (req, res, next) => {
    forum.find()
    .exec()
    .then(result =>{
        res.status(200).json(result);
    })
    .catch(error =>{
        res.status(500).json({
            error: error
        });
    });
});

router.put('/reply', (req, res, next) => {
    forum.findByIdAndUpdate(req.body._id,{
        discussions:req.body.discussions
    }).then( result=>{
       
        res.status(200).json({
            message: "discussion updated successfully"
        });
    });

});


module.exports = router;
