const Account = require('../models/account.model');
const User = require('../models/user.model');

// Generate random account number
const generateAccountNumber = () => 'SB' + Math.floor(100000000 + Math.random() * 900000000);

exports.requestAccount = async (req, res) => {
  const { userId } = req.body;
  const existing = await Account.findOne({ userId });

  if (existing) return res.status(400).json({ message: 'Account request already exists.' });

  const account = new Account({ userId });
  await account.save();

  res.status(201).json({ message: 'Account request submitted.' });
};

exports.getPendingAccounts = async (req, res) => {
  const pending = await Account.find({ status: 'PENDING' }).populate('userId', 'name email');
  res.json(pending);
};

exports.approveAccount = async (req, res) => {
  const account = await Account.findById(req.params.id);
  if (!account) return res.status(404).json({ message: 'Account not found' });

  account.accountNumber = generateAccountNumber();
  account.status = 'APPROVED';
  account.remarks = 'Approved by admin';
  await account.save();

  res.json({ message: 'Account approved', account });
};

exports.rejectAccount = async (req, res) => {
  const account = await Account.findById(req.params.id);
  if (!account) return res.status(404).json({ message: 'Account not found' });

  account.status = 'REJECTED';
  account.remarks = 'Rejected by admin';
  await account.save();

  res.json({ message: 'Account rejected' });
};
