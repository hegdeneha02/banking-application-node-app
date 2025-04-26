const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

exports.changeLoginPassword = async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;
  const user = await User.findOne({email:email});
  if (!user) return res.status(404).json({ message: 'User not found' });

  const match = await bcrypt.compare(oldPassword, user.password);
  if (!match) return res.status(401).json({ message: 'Incorrect old password' });

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  res.json({ message: 'Login password updated successfully' });
};

exports.changeTransactionPassword = async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const match = await bcrypt.compare(oldPassword, user.transactionPassword);
  if (!match) return res.status(401).json({ message: 'Incorrect old transaction password' });

  user.transactionPassword = await bcrypt.hash(newPassword, 10);
  await user.save();

  res.json({ message: 'Transaction password updated successfully' });
};
