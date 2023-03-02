
const jwt = require('jsonwebtoken');
const message = require('../utils/message');
function authenticateToken(req, res, next) {
  // Get token from Authorization header
  const token = req.headers['authorization'] || req.query.token;
  console.log("authenticateToken:", token);

  // If token is null, return 401 Unauthorized
  if (!token) {
    return res.send(message('', false, 'Không có quyền truy cập'));
  }
  try {

    // Verify token using secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add decoded user information to request object
    req.body = { ...decoded, ...req.body };
    console.log("Body after authenticateToken: \n", req.body);
    next();

  } catch (error) {
    if (error.message == 'jwt expired') {
      return res.send(message(error, false, 'Token đã hết hạn'));
    }
    return res.send(message(error, false, 'Token không hợp lệ'));
  }
}

function staffCheck(req, res, next) {
  const role = req.body.role;
  if (role != 'staff' && role != 'manager') {
    return res.send(message({ client: role, require: 'staff || manager' }, false, 'Không có quyền truy cập'));
  }
  next();
}

function managerCheck(req, res, next) {
  const role = req.body.role;
  if (role != 'manager') {
    return res.send(message({ client: role, require: 'manager' }, false, 'Không có quyền truy cập'));
  }
  next();
}

module.exports = { authenticateToken, managerCheck, staffCheck };