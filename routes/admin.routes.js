const express = require('express');
const router = express.Router();
const { getAdminDashboard } = require('../controllers/admin.controller');
const { verifyToken ,verifyAdmin} = require('../middleware/auth.middleware');

router.get('/dashboard', verifyToken,verifyAdmin, getAdminDashboard);

module.exports = router;
