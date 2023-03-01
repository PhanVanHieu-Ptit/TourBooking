const message = require('../utils/message');
const connection = require("../utils/connection");
const { encode, compare } = require('../utils/my-bcrypt');
const { getToken } = require('../utils/token');
const path = require('path');
const { sendChangePassMail } = require('../utils/mail')
class AccountControllers {
  async signUp(req, res, next) {

    let { name, email, password, phoneNumber, imageUrl, address } = req.body;

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
    res.send(message({ idCustomer: rows.insertId, username: email }, true, 'Đăng ký thành công'));

  }
  async signIn(req, res) {
    try {
      const { username, password } = req.body;
      console.log('sign-in: ' + username + ' ' + password);

      if (!username || !password) {
        return res.send(message('', false, 'Tên đăng nhập và mật khẩu không được để trống!'));
      }


      //check valid account
      let [rows, fields] = await connection.execute(
        `select * from account where username='${username}'`
      );
      if (rows.length == 0 || !compare(password, rows[0].password)) {
        return res.send(message('', false, 'Sai tên đăng nhập hoặc mật khẩu!'));
      }

      //set token for client
      const token = getToken(username);
      console.log('authorizationed:', username, token);
      res.setHeader('authorization', token);
      return res.send(message({ username: rows[0].username }, true,));
    } catch (error) {
      return res.send(message(error, false,));
    }

  }
  async changePassword(req, res) {
    const { email: username, newPassword } = req.body;

    checkData();

    const encodedPassword = encode(newPassword);
    try {
      let [rows, fields] = await connection.execute(
        "update account set password=? where username=?",
        [encodedPassword, username]
      );
      if (rows.changedRows == 1) {
        return res.send(message(username, true, 'Đổi mật khẩu thành công'));
      }
      return res.send(message('', false, 'Đổi mật khẩu thất bại'));

    } catch (error) {
      return res.send(message(error, false, 'Đổi mật khẩu thất bại'));
    }

  }
  async provideStaffAccount(req, res) {
  }
  async forgotPassword(req, res) {
    const { username } = req.body;
    const token = getToken(username, true);
    const rs = await sendChangePassMail(username, token);
    if (rs.response.includes("OK")) {
      return res.send(message('', true, 'Đã gửi mail đổi mật khẩu tới: \n' + username));
    }
    return res.send(message(rs, false, 'Khôi phục mật khẩu thất bại!'));

  }
  async changePasswordForm(req, res) {

    res.sendFile(path.join(__dirname, '../public/change-password-form.html'))
  }

}
function checkData() {
}
module.exports = new AccountControllers;

