//not done yet
var listAddress = ['Hồ Chí Minh', 'Đà Lạt', 'Hà Nội']
function checkAddress(address) {
  return listAddress.includes(address);
}

module.exports = { listAddress, checkAddress };