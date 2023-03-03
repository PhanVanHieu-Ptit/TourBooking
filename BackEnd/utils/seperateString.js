function seperateString(result) {
  var tours = [];
  result.forEach(function (tour) {
    const image_list = tour.image_list;
    const imgUrl = image_list.split(",");
    tour["imageUrl"] = imgUrl;
    delete tour.image_list;
    tours.push(tour);
  });
  console.log("tours: ", tours);
  return tours;
}

module.exports = seperateString;
