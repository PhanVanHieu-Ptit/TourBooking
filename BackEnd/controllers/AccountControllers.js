const message = require("../utils/message");
const connection = require("../utils/connection");
const { encode, compare } = require("../utils/my-bcrypt");
const { getToken, getRefeshToken } = require("../utils/token");
const path = require("path");
const { sendChangePassMail } = require("../utils/mail");
class AccountControllers {
  async signUp(req, res, next) {
    let { name, email, password, phoneNumber, imageUrl, address } = req.body;

    try {
      //pre-process data
      password = encode(password);
      // await connection.beginTransaction();
      //insert tài khoản
      await connection.execute("call managetour.sp_create_account(?, ?,'');", [
        email,
        password,
      ]);

      // insertCustomer
      await connection.execute(
        "call managetour.sp_create_customer(?, ?, ?, ?, ?);",
        [name, email, phoneNumber, imageUrl, address]
      );

      let [rows, fields] = await connection.execute(
        "call managetour.sp_get_customer_by_email(?);",
        [email]
      );
      // await connection.commit();
      return res.send(
        message(
          { idCustomer: rows.idCustomer, username: email },
          true,
          "Đăng ký thành công"
        )
      );
    } catch (error) {
      // await connection.rollback();
      return res.send(message(error, false));
    }
  }
  async signIn(req, res) {
    try {
      const { username, password } = req.body;
      console.log(req.body);
      console.log("sign-in: " + username + " " + password);
      //check valid data form
      if (!username || !password) {
        return res.send(
          message("", false, "Tên đăng nhập và mật khẩu không được để trống!")
        );
      }

      //check valid account
      let [rows, fields] = await connection.execute(
        `call managetour.sp_get_account('${username}');`
        // `select * from account where username= '${username}'`
      );

      console.log("rows: ", rows);

      if (rows[0].length == 0 || !compare(password, rows[0][0].password)) {
        return res.send(message("", false, "Sai tên đăng nhập hoặc mật khẩu!"));
      }
      const role = rows[0][0].role;
      if (role == "customer")
        [rows, fields] = await connection.execute(
          `call managetour.sp_get_customer_by_email('${username}');`
        );
      else if (role == "staff" || role == "admin")
        [rows, fields] = await connection.execute(
          `call managetour.sp_get_staff_by_email('${username}');`
        );
      if (rows[0].length == 0 && role != "admin") {
        return res.send(message("", false, "Không có thông tin user!"));
      }
      if (role == "staff" && rows[0][0].idStatus == 7) {
        return res.send(message("", false, "Tài khoản bị khóa!"));
      }
      const { name, imageUrl, phoneNumber, email, address } = rows[0][0];
      let id = rows[0][0].idStaff;
      if (role == "customer") {
        id = rows[0][0].idCustomer;
      }
      //set token for client
      const token = getToken(username, false, role);
      const refreshToken = getRefeshToken(username, role);
      res.setHeader("Authorization", token);
      res.setHeader("Access-Control-Expose-Headers", "*");
      return res.send(
        message(
          {
            id,
            name,
            imageUrl,
            role,
            phoneNumber,
            email,
            address,
            refreshToken,
          },
          true,
          "Đăng nhập thành công"
        )
      );
    } catch (error) {
      return res.send(message(error, false));
    }
  }
  async changePassword(req, res) {
    const { email: username, newPassword, oldPassword } = req.body;
    if (!newPassword || !oldPassword) {
      return res.send(
        message("", false, "Mật khẩu mới và mật khẩu cũ không được để trống")
      );
    }
    //check valid old password
    let [rows, fields] = await connection.execute(
      `call managetour.sp_get_account('${username}');`
    );

    if (!compare(oldPassword, rows[0][0].password)) {
      return res.send(message("", false, "Mật khẩu cũ không trùng khớp"));
    }
    const encodedPassword = encode(newPassword);
    try {
      let [rows, fields] = await connection.execute(
        "call managetour.sp_update_account(?, ?);",
        [username, encodedPassword]
      );

      if (rows.affectedRows == 1) {
        return res.send(message(username, true, "Đổi mật khẩu thành công"));
      }
      return res.send(message("", false, "Đổi mật khẩu thất bại"));
    } catch (error) {
      return res.send(message(error, false, "Đổi mật khẩu thất bại"));
    }
  }
  async changePasswordInForgot(req, res) {
    const { email: username, newPassword } = req.body;
    //check valid old password
    if (!newPassword) {
      return res.send(message("", false, "Mật khẩu mới không được để trống!"));
    }
    // let [rows, fields] = await connection.execute(
    //   `call managetour.sp_get_account('${username}');`
    // );
    const encodedPassword = encode(newPassword);
    try {
      let [rows, fields] = await connection.execute(
        "call managetour.sp_update_account(?, ?);",
        [username, encodedPassword]
      );
      if (rows.affectedRows == 1) {
        return res.send(message(username, true, "Đổi mật khẩu thành công"));
      }
      return res.send(message("", false, "Đổi mật khẩu thất bại"));
    } catch (error) {
      return res.send(message(error, false, "Đổi mật khẩu thất bại"));
    }
  }
  async provideStaffAccount(req, res) {}
  async forgotPassword(req, res) {
    const { username } = req.body;
    // check valid email
    let [rows, fields] = await connection.execute(
      `call managetour.sp_get_account('${username}');`
    );
    if (rows[0].length == 0) {
      return res.send(message("", false, "Email không hợp lệ!"));
    }

    const token = getToken(username, true);
    const rs = await sendChangePassMail(username, token);
    if (rs.response.includes("OK")) {
      return res.send(
        message("", true, "Đã gửi mail đổi mật khẩu tới: " + username)
      );
    }
    return res.send(message(rs, false, "Khôi phục mật khẩu thất bại!"));
  }
  async changePasswordForm(req, res) {
    res.sendFile(path.join(__dirname, "../public/change-password-form.html"));
  }

  // [POST] /account/refresh-token
  async refeshToken(req, res) {
    const refreshToken = req.body.token;
    console.log(req.body);
    if (!refreshToken) return res.sendStatus(401);

    var jwt = require("jsonwebtoken");
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, user) => {
      if (err)
        return res.send(message("", false, "Refesh token không hợp lệ!"));

      const token = getToken(user.email, false, user.role);
      return res.send(message({ token }, true, "Refesh token thành công!"));
    });
  }
}
module.exports = new AccountControllers();
