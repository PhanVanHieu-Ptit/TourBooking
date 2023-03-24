function getToken(email, mailChangePassword = false, role = "customer") {
  let minutes = 1200;
  if (mailChangePassword) minutes = 50;
  require("dotenv").config();
  var jwt = require("jsonwebtoken");
  var token = jwt.sign(
    {
      email,
      role,
      isa: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * minutes,
    },
    process.env.JWT_SECRET
  );
  console.log("maked token:", email, role, token);

  return token;
}

function getRefeshToken(email, role = "customer") {
  let minutes = 4320;
  require("dotenv").config();
  // Generate a refresh token
  var jwt = require("jsonwebtoken");
  const refreshToken = jwt.sign(
    {
      email,
      role,
      isa: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * minutes,
    },
    process.env.JWT_SECRET
  );

  console.log("maked refesh token:", email, role, refreshToken);

  return refreshToken;
}

module.exports = { getToken, getRefeshToken };
