const Transaction = require('../models/transaction.model');
const Account = require('../models/account.model');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

exports.transferFunds = async (req, res) => {
    const { fromAccountNumber, toAccountNumber, amount, mode, transactionPassword, note } = req.body;
  
    const fromAccount = await Account.findOne({ accountNumber: fromAccountNumber });
    const toAccount = await Account.findOne({ accountNumber: toAccountNumber });
  
    if (!fromAccount || !toAccount)
      return res.status(404).json({ message: 'One or both accounts not found' });
  
    if (fromAccountNumber === toAccountNumber)
      return res.status(400).json({ message: 'Cannot transfer to same account' });
  
    const user = await User.findById(fromAccount.userId);
    const isValid = await bcrypt.compare(transactionPassword, user.transactionPassword);
    if (!isValid)
      return res.status(401).json({ message: 'Invalid transaction password' });
  
    if (fromAccount.balance < amount)
      return res.status(400).json({ message: 'Insufficient balance' });
  
    fromAccount.balance -= amount;
    toAccount.balance += amount;
  
    await fromAccount.save();
    await toAccount.save();
  
    const transaction = new Transaction({
      fromAccount: fromAccount.accountNumber,
      toAccount: toAccount.accountNumber,
      amount,
      mode,
      note,
      status: 'SUCCESS'
    });
  
    await transaction.save();
    res.status(200).json({ message: 'Transfer successful', transaction });
  };
  

  exports.getTransactionsByAccount = async (req, res) => {
    const { accountNumber } = req.params;
    const account = await Account.findOne({ accountNumber });
  
    if (!account) return res.status(404).json({ message: 'Account not found' });
  
    const transactions = await Transaction.find({
      $or: [
        { fromAccount: account.accountNumber},
        { toAccount: account.accountNumber}
      ]
    })
      .populate('fromAccount', 'accountNumber')
      .populate('toAccount', 'accountNumber')
      .sort({ createdAt: -1 });
  
    res.json(transactions);
  };
  
const { startOfDay, endOfDay } = require('date-fns'); // optional for date handling

exports.getAccountStatement = async (req, res) => {
    const { accountNumber } = req.params;
    const { startDate, endDate, mode, type } = req.query;
  
    const account = await Account.findOne({ accountNumber:accountNumber});
    console.log(account);
    if (!account) return res.status(404).json({ message: 'Account not found' });
  
    const query = {
      $or: [
        { fromAccount: account.accountNumber },
        { toAccount: account.accountNumber }
      ]
    };
  
    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startOfDay(new Date(startDate))),
        $lte: new Date(endOfDay(new Date(endDate)))
      };
    }
  
    if (mode) {
      query.mode = mode;
    }
  
    if (type === 'credit') {
      query.toAccount = account.accountNumber;
    } else if (type === 'debit') {
      query.fromAccount = account.accountNumber;
    }
  
    const transactions = await Transaction.find(query).sort({ createdAt: -1 });
  
    res.json(transactions);
  };
  