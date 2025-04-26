const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  fromAccount: { type: String, ref: 'Account' },
  toAccount: { type: String, ref: 'Account' },
  amount: Number,
  mode: { type: String, enum: ['IMPS', 'NEFT', 'RTGS'] },
  status: { type: String, enum: ['SUCCESS', 'FAILED'], default: 'SUCCESS' },
  note: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', transactionSchema);
