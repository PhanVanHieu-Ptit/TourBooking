//not done yet
let listAddress;
async function checkAddress(address) {
  return (await getListAddress()).includes(address);
}
async function getListAddress() {
  var rp = require("request-promise");
  if (listAddress) return listAddress;
  var rs = JSON.parse(await rp("https://provinces.open-api.vn/api/?depth=1"));
  listAddress = [];
  var id = 1;
  rs.forEach((e) => {
    listAddress.push({ id: id++, name: e.name });
    e.districts.forEach((e) => {
      listAddress.push(e.name);
    });
  });
  console.log("Total address: " + listAddress.length);
  return listAddress;
}

module.exports = { getListAddress, checkAddress };
