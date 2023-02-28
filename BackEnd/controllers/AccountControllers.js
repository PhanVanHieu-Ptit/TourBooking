const message = require('../utils/message');
const connection = require("../utils/connection");
const { listAddress, checkAddress } = require('../utils/address');
const { encode, compare } = require('../utils/my-bcrypt');


class AccountControllers {
  async signUp(req, res) {

    let { name, email, password, phoneNumber, imageUrl, address } = req.body;
    console.log(name, email, password, phoneNumber, imageUrl, address);
    let rows, fields;
    //check data
    if (!name || !phoneNumber || !address) {
      res.send(message('', false, 'Họ tên, số điện thoại, địa chỉ không được để trống!'));
      return;
    }

    if (!email || !password) {
      res.send(message('', false, 'Email và mật khẩu không được để trống!'));
      return;
    }

    if (name.length < 3) {
      res.send(message('', false, 'Tên có ít nhất 3 kí tự!'));
      return;
    }

    if ((phoneNumber.length != 9 && phoneNumber.length != 10) || !phoneNumber.startsWith('0')) {
      res.send(message('', false, "Số điện thoại bắt đầu bằng số '0' và có 9 đến 10 kí tự!"));
      return;
    }

    if (!checkAddress(address)) {
      res.send(message(listAddress, false, "Địa chỉ không hợp lệ: " + address));
      return;
    }

    if (password.length < 6) {
      res.send(message(listAddress, false, "Mật khẩu có ít nhất 6 kí tự!"));
      return;
    }

    // check email đã có người đăng ký
    [rows, fields] = await connection.execute(
      `select * from account where username='${email}'`
    );
    if (rows.length > 0) {
      res.send(message('', false, 'Email đã được đăng ký!'));
      return;
    }

    //pre-process data
    password = encode(password);

    // insertCustomer
    [rows, fields] = await connection.execute(
      "insert into customer(name, email, phoneNumber,imageUrl,address) values (?,?,?,?,?)",
      [name, email, phoneNumber, imageUrl, address]
    );
    await connection.execute(
      "SET FOREIGN_KEY_CHECKS=0;"
    );
    //insert tài khoản
    await connection.execute(
      "insert into account(username,password) values(?,?)",
      [email, password]
    );

    await connection.execute(
      "SET FOREIGN_KEY_CHECKS=1;"
    );

    console.log(rows, fields);
    res.send(message({ idCustomer: rows.insertId, username: email }, true, 'Đăng ký thành công'));
  }
  async signIn(req, res) {
    console.log(req.body);
  }
}

module.exports = new AccountControllers;

