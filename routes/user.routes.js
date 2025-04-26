const express = require('express');
const router = express.Router();
const {
  changeLoginPassword,
  changeTransactionPassword
} = require('../controllers/user.controller');

router.post('/change-password', changeLoginPassword);
router.post('/change-transaction-password', changeTransactionPassword);

module.exports = router;
