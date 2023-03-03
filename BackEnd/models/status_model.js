const db = require("../utils/connection");

const Status = function (status) {
  this.idStatus = status.idStatus;
  this.name = status.name;
  this.type = status.type;
};

Status.getById = function (id, type) {
  return db
    .query(
      "SELECT idStatus, name FROM `status` where idStatus= ? and type = ?",
      [id, type]
    )
    .then(([rows, fields]) => {
      console.log("rows: ", rows);
      return rows;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

module.exports = Status;
