// Author: Marlee Donnelly (B00710138)

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const PendingPet = require('../models/pending-pet');

router.get('/', (req, res, next) => {
    PendingPet.find()
    .exec()
    .then(docs =>{
        console.log(docs);
        res.status(200).json(docs);
    })
    .catch(e =>{
        console.log(e);
        res.status(500).json({error: e});
    });
});

router.post('/', (req, res, next) => {
    const pendingPet = new PendingPet({
        _id: new mongoose.Types.ObjectId(),
        petName: req.body.petName,
        petCategory: req.body.petCategory,
        petAge: req.body.petAge,
        petGender: req.body.petGender,
        petHealth: req.body.petHealth,
        petDescription: req.body.petDescription,
        petUploader: {
            userId: req.body.petUploader.userId,
            firstName: req.body.petUploader.firstName,
            lastName: req.body.petUploader.lastName
        },
        petLocation:{
            petCity: req.body.petLocation.petCity,
            petState: req.body.petLocation.petState,
            petCountry: req.body.petLocation.petCountry
        },
        adoptionStatus: 'Not Adopted',
        petPic: req.body.petPic
    });
    pendingPet.save().then(result =>{
        console.log(result);
    })
    .then(result => {
        res.status(201).json({
        message: 'Added the pet profile to the database.',
        });
    })
    .catch(err => {
       console.log(err);
       res.status(500).json({
            message: 'Failed to add the pet profile to the database.',
            error: err
        });
    })
});

router.delete('/:petId', (req, res, next) => {
    const id = req.params.petId;
    PendingPet.remove({ _id: id} )
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