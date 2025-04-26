const express = require('express');
const router = express.Router();
const {
  requestAccount,
  getPendingAccounts,
  approveAccount,
  rejectAccount
} = require('../controllers/account.controller');

router.post('/request', requestAccount);
router.get('/pending', getPendingAccounts); // Admin
router.post('/approve/:id', approveAccount); // Admin
router.post('/reject/:id', rejectAccount); // Admin

module.exports = router;
