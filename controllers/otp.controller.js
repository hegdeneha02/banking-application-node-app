const { generateAndSendOTP, verifyOTP } = require('../utils/otp');

exports.generateOtp = async (req, res) => {
  const { email } = req.body;
  await generateAndSendOTP(email);
  res.json({ message: 'OTP sent to email' });
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  const isValid = await verifyOTP(email, otp);
  if (!isValid) return res.status(400).json({ message: 'Invalid or expired OTP' });

  res.json({ message: 'OTP verified successfully' });
};
