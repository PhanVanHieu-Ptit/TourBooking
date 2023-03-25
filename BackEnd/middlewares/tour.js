const message = require("../utils/message");
const { checkAddress, getListAddress } = require("../utils/address");
async function tourInsert(req, res, next) {
  const listAttribute = [
    "name",
    "startDate",
    "totalDay",
    "tourIntro",
    "tourDetail",
    "pickUpPoint",
    "tourDestination",
    "detailPickUpPoint",
    "detailTourDestination",
    "price",
    "minQuantity",
    "maxQuantity",
    "normalPenaltyFee",
    "strictPenaltyFee",
    "minDate",
    "tourGuide",
    "featured",
    "tourPictures",
  ];

  listAttribute.forEach((e) => {
    if (!req.body[e] && !res.headersSent) {
      return res.send(
        message(e, false, "Không được để trống thông tin!: " + e)
      );
    }
  });
  if (res.headersSent) return;
  let {
    name,
    startDate,
    totalDay,
    tourIntro,
    tourDetail,
    pickUpPoint,
    tourDestination,
    detailPickUpPoint,
    detailTourDestination,
    price,
    minQuantity,
    maxQuantity,
    normalPenaltyFee,
    strictPenaltyFee,
    minDate,
    tourGuide,
    featured,
    tourPictures,
  } = req.body;
  if (name.lenght < 10) {
    return res.send(message({ name }, false, "Tên tour có 10 kí tự!"));
  }
  if (checkStartDate(startDate)) {
    return res.send(
      message({ startDate }, false, "Ngày bắt đầu không hợp lệ!")
    );
  }
  if (totalDay <= 0) {
    return res.send(
      message({ totalDay }, false, "Tổng số ngày phải lớn hơn 0!")
    );
  }
  if (minQuantity <= 0) {
    return res.send(
      message({ minQuantity }, false, "Số người tối thiểu phải lớn hơn 0!")
    );
  }
  if (Number(maxQuantity) < Number(minQuantity)) {
    return res.send(
      message(
        { minQuantity, maxQuantity },
        false,
        "Số người tối đa phải lớn hơn số người tối thiểu!"
      )
    );
  }
  if (normalPenaltyFee < 0) {
    return res.send(
      message({ normalPenaltyFee }, false, "Phí phạt thường phải lớn hơn 0!")
    );
  }
  if (strictPenaltyFee < normalPenaltyFee) {
    return res.send(
      message(
        { normalPenaltyFee, strictPenaltyFee },
        false,
        "Phí phạt nặng phải lớn hơn phí phạt thường!"
      )
    );
  }
  if (minDate < 0) {
    return res.send(
      message(
        { minDate },
        false,
        "Thời điểm áp dụng phí phạt nặng không hợp lệ!"
      )
    );
  }
  if (tourGuide) {
    tourGuide = 1;
  } else {
    tourGuide = 0;
  }
  if (tourIntro < 10) {
    return res.send(
      message({ tourIntro }, false, "Giới thiệu tour có tối thiểu 10 kí tự!")
    );
  }
  if (tourDetail < 30) {
    return res.send(
      message({ tourDetail }, false, "Chi tiết tour có tối thiểu 30 kí tự!")
    );
  }
  if (!(await checkAddress(pickUpPoint))) {
    return res.send(
      message(
        { pickUpPoint, listAddress: await getListAddress() },
        false,
        "Điểm đón không hợp lệ!"
      )
    );
  }
  if (!(await checkAddress(tourDestination))) {
    return res.send(
      message(
        { tourDestination, listAddress: await getListAddress() },
        false,
        "Điểm đến không hợp lệ!"
      )
    );
  }
  if (price < 0) {
    return res.send(message({ price }, false, "Giá không được nhỏ hơn 0!"));
  }
  if (featured) {
    featured = 1;
  } else {
    featured = 0;
  }
  if (!Array.isArray(tourPictures)) {
    req.body.tourPictures = [tourPictures];
    tourPictures = req.body.tourPictures;
  }
  if (tourPictures.length <= 0 || tourPictures.length >= 7) {
    return res.send(
      message(
        { tourPictures },
        false,
        "Có tối thiểu 1 hình ảnh và tối đa 6 hình!"
      )
    );
  }
  console.log("tourInsert: ");

  next();
}
function checkStartDate(dateStart) {
  return new Date().getTime() < new Date(dateStart).getTime();
}
module.exports = { tourInsert };
