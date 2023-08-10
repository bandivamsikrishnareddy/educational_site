const { Video, Student } = require('../Models/Student');

const addVideo = async (req, res) => {
    try {
        const { userId, title, image, url, viewCount, duration } = req.body;
        const response = await Video.create({ title, image, url, viewCount, duration });

        // Find the student based on the userId
        const student = await Student.findById(userId);

        if (!student) {
            return res.status(404).json({ success: false, error: 'Student not found.' });
        }

        // Add the newly created video to the student's numOfVideosListened array
        student.numOfVideosListened.push(response);

        // Save the updated student document
        await student.save();

        res.status(200).json({ success: true, message: 'Video added to student successfully.' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to add video to student.' });
    }
};

const removeVideo = async (req, res) => {
    try {
        const { userId, videoId } = req.body;

        // Find the student based on the userId
        const student = await Student.findById(userId);

        if (!student) {
            return res.status(404).json({ success: false, error: 'Student not found.' });
        }

        // Check if the video exists in the student's numOfVideosListened array
        const videoIndex = student.numOfVideosListened.findIndex((video) => video.equals(videoId));


        try {
            const resp = await videos.findByIdAndDelete(videoId);
            console.log('video deleted');
        }
        catch (error) {
            console.log('error:', error);
        }
        if (videoIndex === -1) {
            return res.status(404).json({ success: false, error: 'Video not found in student\'s list.' });
        }

        // Remove the video from the student's numOfVideosListened array
        student.numOfVideosListened.splice(videoIndex, 1);

        // Save the updated student document
        await student.save();

        res.status(200).json({ success: true, message: 'Video removed from student successfully.' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to remove video from student.' });
    }
};
const fetchVideos = async (req, res) => {
    try {
        const { userId } = req.body;

        // Find the student based on the userId and populate the videos
        const student = await Student.findById(userId).populate('numOfVideosListened');

        if (!student) {
            return res.status(404).json({ success: false, error: 'Student not found.' });
        }

        const videos = student.numOfVideosListened;

        res.status(200).json({ success: true, videos });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch videos.' });
    }
};

module.exports = {
    addVideo,
    removeVideo,
    fetchVideos,
};
