const mongoose = require('mongoose');

// Moderator Schema
const moderatorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    requests : [
        {
            type :  mongoose.Schema.Types.ObjectId,
            reference : 'Request'
        }
    ]
    
});
const Moderator = mongoose.model('Moderator', moderatorSchema);

module.exports = {
    Moderator,
    
};
