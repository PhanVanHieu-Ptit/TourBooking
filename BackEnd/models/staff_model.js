const db = require("../utils/connection");

const Staff = function (staff) {
  this.idStaff = staff.idStaff;
  this.name = staff.name;
  this.email = staff.email;
  this.imageUrl = staff.imageUrl;
  this.idStatus = staff.idStatus;
};

Staff.getById = function (id) {
  return db
    .query("call managetour.sp_get_staff_by_id(?);", [id])
    .then(([rows, fields]) => {
      // console.log("rows: ", rows);
      return rows[0];
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

module.exports = Staff;
