const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const PendingProduct = require('../models/pending-products');

router.get('/', (req, res, next) => { 
    PendingProduct.find()
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
    const product = new PendingProduct({
        _id: new mongoose.Types.ObjectId(),
        productName: req.body.productName,
        productCategory:req.body.productCategory,
        productPrice: req.body.productPrice,
        productQuantity:req.body.productQuantity,
        productDescription: req.body.productDescription,
        productPic: req.body.productPic,
        productUploader: {
            firstName: req.body.productUploader.firstName,
            lastName:req.body.productUploader.lastName,
            uId: req.body.productUploader.uId
        },
    });
    product.save()
    .then(result => {
        res.status(201).json({
            message: 'Submitted the product for review.',
        });
    })
    .catch(err => {
       console.log(err);
       res.status(500).json({
            message: 'Failed to add the product to the database.',
            error: err
        });
    })
});

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    PendingProduct.remove({ _id: id} )
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



