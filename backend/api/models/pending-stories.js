const mongoose = require('mongoose');

const pendingStorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    storyTitle: { type:String , required:true },
    storycontentModel: { type:String , required:true },
    storyPicModel: { type:String , required:false },
    storyPublisher: {
        userId: { type:String , required:true },
        firstName: { type:String , required:true },
        lastName: { type:String , required:true }
    },
    storyCategory:{ type:String , required:true },
    storyPostDate: { type:String , required:true },
    isApproved:{type:Boolean,require:true},
    isDeleted:{type:Boolean,require:true}
});

module.exports = mongoose.model('PendingStories', pendingStorySchema);