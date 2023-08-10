const express = require('express');
const router = express.Router();
const { Signup, Login, approverequests } = require('../Controllers/ModeratorController')
router.post('/msignup', Signup);
router.post('/mlogin', Login);
router.post('/approve', approverequests);
module.exports = router;