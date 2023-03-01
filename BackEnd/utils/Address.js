//not done yet
async function checkAddress(address) {
  let listAddress = await getListAddress();
  return listAddress.includes(address);
}
async function getListAddress() {
  var rp = require('request-promise');
  var rs = JSON.parse(await rp('https://provinces.open-api.vn/api/?depth=2'));
  var listAddress = [];
  rs.forEach(e => {
    listAddress.push(e.name);
    e.districts.forEach(e => {
      listAddress.push(e.name);
    })
  });
  console.log("Total address: " + listAddress.length);
  return listAddress;
}

module.exports = { getListAddress, checkAddress };