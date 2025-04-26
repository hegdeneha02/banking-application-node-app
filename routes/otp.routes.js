const express = require('express');
const router = express.Router();
const { generateOtp, verifyOtp } = require('../controllers/otp.controller');

router.post('/send', generateOtp);
router.post('/verify', verifyOtp);

module.exports = router;
