const OTP = require('../models/otp.model');
const { sendOTP } = require('./email');

exports.generateAndSendOTP = async (email) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

  // remove existing OTPs for this email
  await OTP.deleteMany({ email });

  await OTP.create({ email, otp, expiresAt });
  await sendOTP(email, otp);
};

exports.verifyOTP = async (email, submittedOtp) => {
  const record = await OTP.findOne({ email });

  if (!record) return false;

  const isValid = record.otp === submittedOtp && record.expiresAt > new Date();
  if (isValid) {
    await OTP.deleteOne({ _id: record._id }); // remove after successful verification
    return true;
  }
  return false;
};
