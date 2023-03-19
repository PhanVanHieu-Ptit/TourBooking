const message = require("../utils/message");
const connection = require("../utils/connection");
class AccountControllers {
  async update(req, res, next) {
    let { name, phoneNumber, imageUrl, address, email } = req.body;
    try {
      let [rows, fields] = await connection.execute(
        "call managetour.sp_update_customer(?, ?, ?, ?);",
        [name, phoneNumber, address, email]
      );

      if (imageUrl) {
        await connection.execute(
          "call managetour.sp_update_image_customer(?, ?);",
          [imageUrl, email]
        );
      }
      [rows, fields] = await connection.execute(
        "call managetour.sp_get_customer_by_email(?);",
        [email]
      );

      return res.send(
        message(rows[0][0], true, "Cập nhật thông tin thành công!")
      );
    } catch (error) {
      return res.send(message(error, false, "Cập nhật thông tin thất bại!"));
    }
  }
}
module.exports = new AccountControllers();
