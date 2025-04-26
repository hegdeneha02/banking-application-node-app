const express = require('express');
const router = express.Router();
const {
    transferFunds,
    getTransactionsByAccount,
    getAccountStatement   
  } = require('../controllers/transaction.controller');
router.post('/transfer', transferFunds);
router.get('/:accountNumber', getTransactionsByAccount);
router.get('/statement/:accountNumber', getAccountStatement);


module.exports = router;
