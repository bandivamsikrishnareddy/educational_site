const mongoose = require('mongoose');

// Achievement Schema
const achievementSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

const Achievement = mongoose.model('Achievement', achievementSchema);

// Video Schema
const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    viewCount: {
        type: Number,
        default: 0,

    },
    duration: {
        type: String,

    },
});



const Video = mongoose.model('Video', videoSchema);

// Student Schema
const studentSchema = new mongoose.Schema({
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
    achievements: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Achievement'
        }
    ],
    numOfVideosListened: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Video'
        }
    ],
    school: {
        type: String,
        required: true
    },
    posts: {
        type: [String],
        default: []
    },
   
   
});

module.exports = mongoose.model('Student', studentSchema);


const Student = mongoose.model('Student', studentSchema);

module.exports = {
    Student,
    Achievement,
    Video
};
