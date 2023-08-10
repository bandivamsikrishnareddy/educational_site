const express = require('express');
const router = express.Router();
const { Signup, Login, addRequest, fetchName, fetchRequests } = require('../Controllers/TeacherController')
router.post('/tsignup', Signup);
router.post('/tlogin', Login);
router.post('/addreq', addRequest);
router.post('/ftn', fetchName);
router.post('/ftr', fetchRequests);
module.exports = router;