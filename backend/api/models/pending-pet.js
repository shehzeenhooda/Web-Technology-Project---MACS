// Author: Marlee Donnelly (B00710138)
const mongoose = require('mongoose');

const pendingPetSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    petName: {type: String, required: true},
    petCategory: {type: String, required: true},
    petAge: {type: String, required: true},
    petGender: {type: String, required: true},
    petHealth: {type: String, required: true},
    petDescription: {type: String, required: true},
    petUploader: {
        userId: {type: String, required: true},
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
    },
    petLocation: {
        petCity: {type: String},
        petState: {type: String},
        petCountry: {type: String},
    },
    adoptionStatus: {type: String, required: true},
    petPic: {type: String, required: true},
});

module.exports = mongoose.model('PendingPet', pendingPetSchema);