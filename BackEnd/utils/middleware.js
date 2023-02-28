
const jwt = require('jsonwebtoken');
const message = require('../utils/message');
function authenticateToken(req, res, next) {
  // Get token from Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader;
  console.log(token);
  // const token = authHeader && authHeader.split(' ')[1];

  // If token is null, return 401 Unauthorized
  if (!token) {
    return res.send(message('', false, 'Không có quyền truy cập'));
  }
  try {
    // Verify token using secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    // Add decoded user information to request object
    req.body = { ...decoded, ...req.body };
    console.log(req.body);
    res.send(message(token, true));
    // next();
  } catch (error) {
    if (error.message == 'jwt expired') {
      return res.send(message(error, false, 'Token đã hết hạn'));
    }
    return res.send(message(error, false, 'Token không hợp lệ'));
  }
}

module.exports = authenticateToken;