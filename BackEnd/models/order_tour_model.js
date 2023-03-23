const calculateStart = require("../utils/calculateStart");
const Customer = require("../models/customer_model");
const Tour = require("../models/tour_model");
const db = require("../utils/connection");

const OrderTour = function (order) {
  this.idTourOrder = order.idTourOrder;
  this.idCustomer = order.idCustomer;
  this.idTour = order.idTour;
  this.orderDateTime = order.orderDateTime;
  this.quantity = order.quantity;
  this.note = order.note;
  this.totalMoney = order.totalMoney;
  this.cancelDate = order.cancelDate;
  this.idStatus = order.idStatus;
};

OrderTour.getAll = function (paging, result) {
  console.log("calculateStart(paging): ", calculateStart(paging));
  console.log("paging: ", paging);
  db.query("call managetour.sp_get_all_order(?);", calculateStart(paging))
    .then(([rows, fields]) => {
      result(rows[0]);
    })
    .catch((err) => {
      console.log;
      result(err);
    });
};

OrderTour.findByStatus = function (status, paging, result) {
  db.query("call managetour.sp_get_order_by_name_status(?, 'tourorder', ?);", [
    status,
    calculateStart(paging),
  ])
    .then(([rows, fields]) => {
      result(rows[0]);
    })
    .catch((err) => {
      console.log;
      result(err);
    });
};

OrderTour.getAllFollowCustomer = function (id, paging, result) {
  db.query("call managetour.sp_get_order_follow_customer(?, ?);", [
    id,
    calculateStart(paging),
  ])
    .then(([rows, fields]) => {
      result(rows[0], true);
    })
    .catch((err) => {
      result(err, false, "Lấy dữ liệu thất bại!");
    });
};

OrderTour.getNumberOrderOfCustomer = function (idCustomer, idStatus, result) {
  db.query("call managetour.sp_number_order_of_customer(?, ?);", [
    idCustomer,
    idStatus,
  ])
    .then(([rows, fields]) => {
      result(rows[0], true);
    })
    .catch((err) => {
      result(err, false, "Lấy dữ liệu thất bại!");
    });
};

OrderTour.findByStatusFollowCustomer = function (id, status, paging, result) {
  db.query(
    "call managetour.sp_get_order_by_status_follow_customer(?, ?, 'tourorder', ?);",
    [id, status, calculateStart(paging)]
  )
    .then(([rows, fields]) => {
      result(rows[0]);
    })
    .catch((err) => {
      result(err);
    });
};

OrderTour.getById = function (id) {
  return db
    .query("call managetour.sp_get_order_by_id(?);", [id])
    .then(([rows, fields]) => {
      return rows[0];
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

OrderTour.findBykey = function (key, paging) {
  return db
    .query("call managetour.sp_get_order_by_key(?, ?);", [
      "%" + key + "%",
      calculateStart(paging),
    ])
    .then(([rows, fields]) => {
      return rows[0];
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

OrderTour.create = async function (data, result) {
  const getTotalMoney = require("../utils/getTotalMoney");
  let { idCustomer, idTour, quantity, note, role } = data;

  //check value
  if (!idCustomer || !idTour) {
    result([], false, "Thiếu thông tin khách hàng hoặc thông tin tour");
    return;
  }

  //check role
  if (role != "customer") {
    result([], false, "Bạn không phải khách hàng!");
    return;
  }

  //check exist of customer
  // const [customer] = await Customer.getById(id);

  // if (customer == undefined) {
  //   result([], false, "Khách hàng không tồn tại!");
  //   return;
  // }

  //check exist of tour
  const [tour] = await Tour.getById(idTour);

  if (tour == undefined) {
    result([], false, "Tour không tồn tại!");
    return;
  }

  if (new Date(tour.startDate).getTime() < new Date().getTime()) {
    result([], false, "Tour đã khởi hành, không thể đặt!");
    return;
  }

  if (Number(quantity) < 1) {
    result([], false, "Số lượng phải lơn hơn 0!");
    return;
  }

  //check number slots left
  const number = await Tour.getSlotsLeft(idTour);
  if (Number(number[0][0].slotLeft) == 0) {
    result([], false, "Hết vé!");
    return;
  }
  if (Number(number[0][0].slotLeft) < Number(quantity)) {
    result([], false, "Số vé còn lại không đủ!");
    return;
  }

  //check customer exist least one order orther
  // const [numberOrder, fields] = await db.query(
  //   "SELECT count(*) as currentNumber FROM `tourorder` where idCustomer = ? and idTour = ?",
  //   [idCustomer, idTour]
  // );

  // if (numberOrder[0].currentNumber > 0) {
  //   result([], false, "Bạn đã đặt tour này rồi!");
  //   return;
  // }

  const totalMoney = await getTotalMoney(data.idTour, data.quantity);
  if (!totalMoney) {
    result([], false);
    return;
  }

  db.query("call managetour.sp_create_order(?, ?, ?, ?, ?);", [
    idCustomer,
    idTour,
    quantity,
    note,
    totalMoney,
  ])
    .then(([rows, fields]) => {
      if (rows.affectedRows == 1)
        result([{}], true, "Đăng ký tour thành công!");
      else result([{}], false, "Đăng ký tour thất bại!");
    })
    .catch((err) => {
      console.log(err);
      result(err);
    });
};

OrderTour.update = async function (data, result) {
  const getTotalMoney = require("../utils/getTotalMoney");
  const totalMoney = await getTotalMoney(data.idTour, data.quantity);
  db.query("call managetour.sp_update_order(?, ?, ?, ?, ?, ?);", [
    data.idTourOrder,
    data.idCustomer,
    data.idTour,
    data.quantity,
    data.note,
    totalMoney,
  ])
    .then(([rows, fields]) => {
      if (rows.affectedRows == 1) result(data, true, "Cập nhật thành công!");
      else result([{}], true, "Cập nhật thất bại!");
    })
    .catch((err) => {
      console.log(err);
      result(err);
    });
};

OrderTour.confirm = function (id, idStatus) {
  // let cancelDate = "";
  // if (idStatus == 10) cancelDate = ", cancelDate=NOW()";
  return db
    .query("call managetour.sp_update_status_order(?, ?);", [idStatus, id])
    .then(([rows, fields]) => {
      console.log(rows);
      return rows;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

OrderTour.getNumberTourOrder = function (idStatus) {
  console.log("idStatus: ", idStatus);
  return db
    .query("call managetour.sp_num_tour_order(?);", [idStatus])
    .then(([rows, fields]) => {
      return rows[0];
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

module.exports = OrderTour;
