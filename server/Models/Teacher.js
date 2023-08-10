const mongoose = require('mongoose');
const { Achievement, Video } = require('./Student');

const requestSchema = new mongoose.Schema({
    content: {
        type: String,

        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved'],
        default: 'pending'
    },
    approved_by:
    {
        type: String,
        default: "",
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Request = mongoose.model('Request', requestSchema);
// Teacher Schema
const teacherSchema = new mongoose.Schema({
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
    videos: [
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
    requests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Request'
        }
    ]
});

const Teacher = mongoose.model('Teacher', teacherSchema);


module.exports = { Teacher, Request };
