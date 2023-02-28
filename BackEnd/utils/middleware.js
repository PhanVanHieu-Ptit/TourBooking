
const jwt = require('jsonwebtoken');
const message = require('./utils/message');
function authenticateToken(req, res, next) {
  // Get token from Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // If token is null, return 401 Unauthorized
  if (!token) {
    return res.json(message([], false, 'Không có quyền truy cập'));
  }

  try {
    // Verify token using secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Add decoded user information to request object
    req.user = decoded;
    // Call next middleware function
    next();
  } catch (error) {
    return res.json(message([], false, 'Token không hợp lệ'));
  }
}

module.exports = authenticateToken;