const mongoose = require('mongoose');

const pendingProductSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    productName: { type:String , required:true },
    productPrice: { type:Number , required:true },
    productQuantity: {type:Number , required:true},
    productDescription: { type:String , required:true },
    productCategory: { type:String , required:true },
    productPic: { type:String , required:true },
    productReview: [],
    productUploader: {
        firstName: { type:String , required:true },
        lastName: { type:String , required:true },
        uId:{ type: String, required:true }
    }
    
});

module.exports = mongoose.model('PendingProduct', pendingProductSchema);