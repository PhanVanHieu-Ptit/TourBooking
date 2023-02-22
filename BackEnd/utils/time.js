function init() {
  this.date_ob = new Date();
  this.date = ("0" + date_ob.getDate()).slice(-2);
  this.month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  this.year = date_ob.getFullYear();
  // current hours
  this.hours = date_ob.getHours();
  // current minutes
  this.minutes = date_ob.getMinutes();
  // current seconds
  this.seconds = date_ob.getSeconds();
  // prints date in YYYY-MM-DD format
}
function getDateTime() {
  init();
  return (year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
}

module.exports = getDateTime();