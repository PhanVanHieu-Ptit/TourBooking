const message = require('../utils/message');



class AccountControllers {
  async signUp(req, res) {
    const connection = require("../utils/connection");

    let { name, email, password, phoneNumber, imageUrl, address } = req.body;
    //check data
    console.log(name, email, password, phoneNumber, imageUrl, address);

    //check tài khoản tồn tại

    //pre-process data
    const { encode } = require('../utils/my-bcrypt');
    password = encode(password);
    let [rows, fields] = await connection.execute(
      "insert into customer(name, email, phoneNumber,imageUrl,address) values (?,?,?,?,?)",
      [name, email, phoneNumber, imageUrl, address]
    );
    let idCustomer = rows.insertId;
    //insert tài khoản
    [rows, fields] = await connection.execute(
      "insert into account(username,password,role) values(?,?,?)",
      [email, password, 'customer']
    );
    let username = rows.insertId;

    console.log(rows, fields);
    res.send(message({ idCustomer, username }, true, 'Đăng ký thành công'));
  }
}

module.exports = new AccountControllers;

