const message = require("../utils/message");
const connection = require("../utils/connection");
const { encode, compare } = require("../utils/my-bcrypt");
const { getToken } = require("../utils/token");
const path = require("path");
const { sendChangePassMail } = require("../utils/mail");
class AccountControllers {
  async signUp(req, res, next) {
    let { name, email, password, phoneNumber, imageUrl, address } = req.body;

    try {
      //pre-process data
      password = encode(password);

      //insert tài khoản
      await connection.execute(
        "insert into account(username,password) values(?,?)",
        [email, password]
      );

      // insertCustomer
      let [rows, fields] = await connection.execute(
        "insert into customer(name, email, phoneNumber,imageUrl,address) values (?,?,?,?,?)",
        [name, email, phoneNumber, imageUrl, address]
      );
      return res.send(
        message(
          { idCustomer: rows.insertId, username: email },
          true,
          "Đăng ký thành công"
        )
      );
    } catch (error) {
      return res.send(message(error, false));
    }
  }
  async signIn(req, res) {
    try {
      const { username, password } = req.body;
      console.log("sign-in: " + username + " " + password);
      //check valid data form
      if (!username || !password) {
        return res.send(
          message("", false, "Tên đăng nhập và mật khẩu không được để trống!")
        );
      }

      //check valid account
      let [rows, fields] = await connection.execute(
        `select * from account where username='${username}'`
      );
      if (rows.length == 0 || !compare(password, rows[0].password)) {
        return res.send(message("", false, "Sai tên đăng nhập hoặc mật khẩu!"));
      }
      const role = rows[0].role;
      if (role == "customer")
        [rows, fields] = await connection.execute(
          `select * from customer  where email='${username}'`
        );
      else if (role == "staff")
        [rows, fields] = await connection.execute(
          `select * from staff  where email='${username}'`
        );
      if (rows.length == 0 && role != "admin") {
        return res.send(message("", false, "Không có thông tin user!"));
      }
      if (role == "staff" && rows[0].idStatus == 7) {
        return res.send(message("", false, "Tài khoản bị khóa!"));
      }
      const { name, imageUrl, phoneNumber, email, address } = rows[0];
      let id = rows[0].idStaff;
      if (role == "customer") {
        id = rows[0].idCustomer;
      }
      //set token for client
      const token = getToken(username, false, role);
      res.setHeader("Authorization", token);
      return res.send(
        message(
          { id, name, imageUrl, role, phoneNumber, email, address },
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
      "select * from account where username=?",
      [username]
    );

    if (!compare(oldPassword, rows[0].password)) {
      return res.send(message("", false, "Mật khẩu cũ không trùng khớp"));
    }
    const encodedPassword = encode(newPassword);
    try {
      let [rows, fields] = await connection.execute(
        "update account set password=? where username=?",
        [encodedPassword, username]
      );
      if (rows.changedRows == 1) {
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
    let [rows, fields] = await connection.execute(
      "select * from account where username=?",
      [username]
    );
    const encodedPassword = encode(newPassword);
    try {
      let [rows, fields] = await connection.execute(
        "update account set password=? where username=?",
        [encodedPassword, username]
      );
      if (rows.changedRows == 1) {
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
      `select * from account where username='${username}'`
    );
    if (rows.length == 0) {
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
}
module.exports = new AccountControllers();
