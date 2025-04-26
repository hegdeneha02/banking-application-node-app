const User = require('../models/user.model');
const Account = require('../models/account.model');
const Transaction = require('../models/transaction.model');

exports.getAdminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalAccounts = await Account.countDocuments({ status: 'APPROVED' });
    const pendingAccounts = await Account.countDocuments({ status: 'PENDING' });
    const totalTransactions = await Transaction.countDocuments();
    const totalVolume = await Transaction.aggregate([
      { $match: { status: 'SUCCESS' } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    res.json({
      totalUsers,
      totalApprovedAccounts: totalAccounts,
      totalPendingAccounts: pendingAccounts,
      totalTransactions,
      totalTransactionVolume: totalVolume[0]?.total || 0
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch dashboard data', error: err.message });
  }
};
