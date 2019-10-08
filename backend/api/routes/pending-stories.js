const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const PendingStory = require('../models/pending-stories');

router.get('/', (req, res, next) => {
    PendingStory.find()
    .exec()
    .then(docs =>{
        res.status(200).json(docs);
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    });
});

router.post('/', (req, res, next) => {
    const story = new PendingStory({
        _id: new mongoose.Types.ObjectId(),
        storyTitle: req.body.storyTitle,
        storycontentModel: req.body.storycontentModel,
        storyPicModel: req.body.storyPicModel,
        storyPublisher: {
            userId: req.body.storyPublisher.userId,
            firstName: req.body.storyPublisher.firstName,
            lastName: req.body.storyPublisher.lastName
        },
        storyCategory:req.body.storyCategory,
        storyPostDate: new Date(),
        isApproved:false,
        isDeleted:false
    });
    story.save().then(result => {
        res.status(201).json({
            message: 'Submitted the story for review.',
        });
    })
    .catch(err => {
       console.log(err);
       res.status(500).json({
            message: 'Failed to add the story to the database.',
            error: err
        });
    })
});

router.delete('/:storyId', (req, res, next) => {
    const id = req.params.storyId;
    PendingStory.remove({ _id: id} )
    .exec()
    .then(result =>{
        res.status(200).json(result);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
});

module.exports = router;