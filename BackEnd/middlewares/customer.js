const message = require('../utils/message')
const { getListAddress, checkAddress } = require('../utils/address');

async function customerInsert(req, res, next) {

  let { name, email, password, phoneNumber, imageUrl, address } = req.body;
  console.log("customerVerify: ", name, email, password, phoneNumber, imageUrl, address);
  if (!name || !phoneNumber || !address) {
    return res.send(message('', false, 'Họ tên, số điện thoại, địa chỉ không được để trống!'))
  }
  if (name.length < 3) {
    return res.send(message('', false, 'Tên có ít nhất 3 kí tự!'));
  }
  if ((phoneNumber.length != 9 && phoneNumber.length != 10) || !phoneNumber.startsWith('0')) {
    return res.send(message('', false, "Số điện thoại bắt đầu bằng số '0' và có 9 đến 10 kí tự!"));
  }
  if (!(await checkAddress(address))) {
    return res.send(message(await getListAddress(), false, "Địa chỉ không hợp lệ: " + address));
  }
  if (imageUrl == 'undefined')
    req.body.imageUrl = null;
  next();
}

module.exports = { customerInsert };