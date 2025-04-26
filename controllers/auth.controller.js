const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const {
      name,
      email,
      mobile,
      aadhar,
      dob,
      address,
      occupation,
      password,
      transactionPassword,
      role
    } = req.body;
  
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedTPass = await bcrypt.hash(transactionPassword, 10);
  
    const user = new User({
      name,
      email,
      mobile,
      aadhar,
      dob,
      address,
      occupation,
      password: hashedPassword,
      transactionPassword: hashedTPass,
      role: role === 'admin' ? 'admin' : 'user' 
    });
  
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  };
  

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });
  if (user.isLocked) return res.status(403).json({ message: 'Account locked' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    user.attempts += 1;
    if (user.attempts >= 3) {
      user.isLocked = true;
    }
    await user.save();
    return res.status(401).json({ message: 'Incorrect password' });
  }

  user.attempts = 0;
  await user.save();

  const token = jwt.sign(
  { userId: user._id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: '1h' }
);
res.json({ token });
};
