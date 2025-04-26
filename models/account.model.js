const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  accountNumber: { type: String, unique: true },
  balance: { type: Number, default: 0 },
  status: { type: String, enum: ['PENDING', 'APPROVED', 'REJECTED'], default: 'PENDING' },
  remarks: String,
}, { timestamps: true });

module.exports = mongoose.model('Account', accountSchema);
