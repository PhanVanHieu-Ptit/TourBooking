const db = require("../utils/connection");

const Status = function (status) {
  this.idStatus = status.idStatus;
  this.name = status.name;
  this.type = status.type;
};

Status.getById = function (id, type) {
  return db
    .query("call managetour.sp_get_status_by_id(?, ?);", [id, type])
    .then(([rows, fields]) => {
      // console.log("rows: ", rows);
      return rows[0];
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

Status.getFollowType = function (type, result) {
  db.query("call managetour.sp_get_status_by_type(?);", type)
    .then(([rows, fields]) => {
      console.log("rows: ", rows);
      var list = [];
      rows[0].forEach((element) => {
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
