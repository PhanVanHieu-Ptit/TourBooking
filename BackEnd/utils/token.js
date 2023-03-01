function getToken(email) {
  require("dotenv").config();
  var jwt = require("jsonwebtoken");
  var token = jwt.sign(
    {
      email,
      role: "customer",
      isa: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 5,
    },
    process.env.JWT_SECRET
  );
  return token;
}

module.exports = { getToken };
