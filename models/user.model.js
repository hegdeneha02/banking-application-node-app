const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  mobile: String,
  aadhar: String,
  dob: Date,
  address: String,
  occupation: String,
  password: String,
  transactionPassword: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  attempts: { type: Number, default: 0 },
  isLocked: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
