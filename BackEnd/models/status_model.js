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
      // console.log("rows: ", rows);
      return rows;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

Status.getFollowType = function (type, result) {
  db.query("SELECT name FROM `status` where type = ?", type)
    .then(([rows, fields]) => {
      console.log("rows: ", rows);
      var list = [];
      rows.forEach((element) => {
        list.push(element.name);
      });
      result(list);
    })
    .catch((err) => {
      console.log(err);
      result(err);
    });
};

module.exports = Status;
