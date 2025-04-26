const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach userId to request
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

exports.verifyAdmin = (req, res, next) => {
    if (req.user?.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }
    next();
  };
  