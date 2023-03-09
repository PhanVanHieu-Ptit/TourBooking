const db = require("../utils/connection");

const Picture = function (picture) {
  this.imgId = picture.imgId;
  this.idTour = picture.idTour;
  this.imgUrl = picture.imgUrl;
};

Picture.getByIdTour = function (id) {
  return db
    .query("select imgId as id, imageUrl from tourpicture where idTour = ?", id)
    .then(([rows, fields]) => {
      // console.log(rows);
      return rows;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

module.exports = Picture;
