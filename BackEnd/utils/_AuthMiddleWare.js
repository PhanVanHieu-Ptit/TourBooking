let isAuth = async function (req, res, next) {
  var _JWT = require("../utils/_JWT");
  var _token = req.headers.authorization;
  if (_token) {
    try {
      var authData = await _JWT.check(_token);
      req.auth = authData;
      next();
    } catch (err) {
      return res.send("Ma token khong hop le");
    }
  } else {
    return res.send("Ban chua gui ma token");
  }
};

module.exports = {
  isAuth: isAuth,
};
