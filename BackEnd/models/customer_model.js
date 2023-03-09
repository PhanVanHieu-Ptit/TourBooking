const db = require("../utils/connection");

const Customer = function (customer) {
  this.idCustomer = customer.idCustomer;
  this.name = customer.name;
  this.email = customer.email;
  this.phoneNumber = customer.phoneNumber;
  this.imageUrl = customer.imageUrl;
  this.address = customer.address;
};

Customer.getById = function (id) {
  return db
    .query("SELECT * FROM `customer` where idCustomer= ?", id)
    .then(([rows, fields]) => {
      // console.log("rows: ", rows);
      return rows;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

module.exports = Customer;
