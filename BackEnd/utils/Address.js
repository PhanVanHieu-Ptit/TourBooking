//not done yet
class Address {
  static listAddress = ['Hồ Chí Minh', 'Đà Lạt', 'Hà Nội']
  static checkAddress(address) {
    return listAddress.includes(address);
  }
}

module.exports = Address;