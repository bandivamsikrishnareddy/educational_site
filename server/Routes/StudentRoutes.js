const express = require('express');
const router = express.Router();
const {
    Signup,
    Login,
    fetchname,
    addachievement,
    fetchachievements,
    removeachievement,
} = require('../Controllers/StudentController');

const { addVideo, fetchVideos, removeVideo } = require('../Controllers/VideoController');

// Student routes
router.post('/signup', Signup);
router.post('/login', Login);
router.post('/fetchname', fetchname);
router.post('/addach', addachievement);
router.post('/fetchach', fetchachievements);
router.post('/removeach', removeachievement);

// Video routes
router.post('/addvideo', addVideo);
router.post('/fetchvideo', fetchVideos);
router.post('/removevideo', removeVideo);

module.exports = router;
