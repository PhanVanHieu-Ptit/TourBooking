const jwt = require("jsonwebtoken");
const { resolve } = require("path");
const _APP = require("./_APP");

//tao ma token
let make = function (user) {
  return new Promise(function (resolve, reject) {
    jwt.sign(
      { data: user },
      _APP.ACCESS_TOKEN,
      {
        algorithm: "HS256",
        expiresIn: _APP.TOKEN_TIME_LIFE,
      },
      function (err, _token) {
        if (err) {
          return reject(err);
        }
        return resolve(_token);
      }
    );
  });
};

//check => xac thuc
let check = function (token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, _APP.ACCESS_TOKEN, function (err, data) {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
};

module.exports = {
  make: make,
  check: check,
};
