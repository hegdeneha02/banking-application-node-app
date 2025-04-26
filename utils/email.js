const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,       // your email
    pass: process.env.EMAIL_PASSWORD    // app password
  }
});

exports.sendOTP = async (to, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Your OTP for Online Banking',
    html: `<h3>Your OTP is <b>${otp}</b>. It is valid for 5 minutes.</h3>`
  };

  return transporter.sendMail(mailOptions);
};
