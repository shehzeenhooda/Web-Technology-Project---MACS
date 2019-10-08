// Developed by  Ajith Jayanthi B00825322 aj788769@dal.ca 
const mongoose = require('mongoose');

var forumSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title:{type:String,required:true},
    description:{ type:String , required:true },
    image:{type:String,required:true},
    time:{type:String , required:true},
    repliesCount:{type:Number,required:true},
    uid:{type:String,required:true},
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    discussions:[]
});


module.exports = mongoose.model('Forum', forumSchema);
