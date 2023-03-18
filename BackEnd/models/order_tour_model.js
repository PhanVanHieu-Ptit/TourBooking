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
  db.query(
    "SELECT * FROM tourorder  ORDER BY tourorder.orderDateTime DESC LIMIT 5 OFFSET ?;",
    calculateStart(paging)
  )
    .then(([rows, fields]) => {
      result(rows);
    })
    .catch((err) => {
      console.log;
      result(err);
    });
};

OrderTour.findByStatus = function (status, paging, result) {
  db.query(
    "SELECT * FROM `tourorder` WHERE idStatus IN (SELECT idStatus FROM `status` WHERE name LIKE ? ) ORDER BY tourorder.orderDateTime DESC LIMIT 5 OFFSET ?",
    [status, calculateStart(paging)]
  )
    .then(([rows, fields]) => {
      result(rows);
    })
    .catch((err) => {
      console.log;
      result(err);
    });
};

OrderTour.getAllFollowCustomer = function (id, paging, result) {
  db.query(
    "SELECT * FROM `tourorder` where idCustomer = ? ORDER BY tourorder.orderDateTime DESC LIMIT 5 OFFSET ?",
    [id, calculateStart(paging)]
  )
    .then(([rows, fields]) => {
      result(rows, true);
    })
    .catch((err) => {
      result(err, false, "Lấy dữ liệu thất bại!");
    });
};

OrderTour.getNumberOrderOfCustomer = function (idCustomer, idTour, result) {
  db.query(
    "SELECT count(*) as currentNumber FROM `tourorder` where idCustomer = ? and idTour = ?",
    [idCustomer, idTour]
  )
    .then(([rows, fields]) => {
      result(rows, true);
    })
    .catch((err) => {
      result(err, false, "Lấy dữ liệu thất bại!");
    });
};

OrderTour.findByStatusFollowCustomer = function (id, status, paging, result) {
  db.query(
    "SELECT `tourorder`.*" +
      "FROM `tourorder`" +
      "JOIN `status` ON `tourorder`.`idStatus` = `status`.`idStatus`" +
      "WHERE `tourorder`.`idCustomer` = ? AND `status`.`name` = ?" +
      " ORDER BY tourorder.orderDateTime DESC LIMIT 5 OFFSET ?",
    [id, status, calculateStart(paging)]
  )
    .then(([rows, fields]) => {
      result(rows);
    })
    .catch((err) => {
      console.log;
      result(err);
    });
};

OrderTour.getById = function (id) {
  return db
    .query("SELECT * FROM `tourorder` where idTourOrder= ?", id)
    .then(([rows, fields]) => {
      console.log("rows: ", rows);
      return rows;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

OrderTour.findBykey = function (key, paging) {
  return db
    .query(
      "SELECT *" +
        " FROM `tourorder`" +
        "WHERE idTour IN (" +
        " SELECT idTour" +
        " FROM `tour`" +
        " WHERE name LIKE ?" +
        "    OR tourIntro LIKE ?" +
        "    OR tourDetail LIKE ?" +
        "    OR pickUpPoint LIKE ?" +
        "    OR tourDestination LIKE ?" +
        " )" +
        " OR idCustomer IN (" +
        "    SELECT idCustomer" +
        "    FROM `customer`" +
        "    WHERE name LIKE ?" +
        "        OR email LIKE ?" +
        "        OR phoneNumber LIKE ?" +
        "        OR address LIKE ?" +
        " )" +
        " ORDER BY tourorder.orderDateTime DESC LIMIT 5 OFFSET ?",
      [
        "%" + key + "%",
        "%" + key + "%",
        "%" + key + "%",
        "%" + key + "%",
        "%" + key + "%",
        "%" + key + "%",
        "%" + key + "%",
        "%" + key + "%",
        "%" + key + "%",
        "%" + key + "%",
        calculateStart(paging),
      ]
    )
    .then(([rows, fields]) => {
      console.log(rows);
      return rows;
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

  db.query(
    "INSERT INTO tourorder SET idCustomer=?, idTour=?, quantity=?, note=?, totalMoney=?",
    [idCustomer, idTour, quantity, note, totalMoney]
  )
    .then(([rows, fields]) => {
      result([{ idOrder: rows.insertId }], true, "Đăng ký tour thành công!");
    })
    .catch((err) => {
      console.log(err);
      result(err);
    });
};

OrderTour.update = async function (data, result) {
  const getTotalMoney = require("../utils/getTotalMoney");
  const totalMoney = await getTotalMoney(data.idTour, data.quantity);
  db.query(
    "UPDATE tourorder SET  quantity=?, note=?, totalMoney=? where idTourOrder=? and idCustomer = ? and idTour = ?",
    [
      data.quantity,
      data.note,
      totalMoney,
      data.idTourOrder,
      data.idCustomer,
      data.idTour,
    ]
  )
    .then(([rows, fields]) => {
      console.log(rows);
      result(data);
    })
    .catch((err) => {
      console.log(err);
      result(err);
    });
};

OrderTour.confirm = function (id, idStatus) {
  let cancelDate = "";
  if (idStatus == 10) cancelDate = ", cancelDate=NOW()";
  return db
    .query(
      "UPDATE tourorder SET  idStatus=?" +
        cancelDate +
        " where idTourOrder = ?;",
      [idStatus, id]
    )
    .then(([rows, fields]) => {
      console.log(rows);
      return rows;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

module.exports = OrderTour;
