const currentDate = new Date();
const { days } = require("./Constants");

function getTime() {
  let hour = currentDate.getHours();
  let mins = currentDate.getMinutes();

  if (hour < 9) {
    hour = "0" + hour;
  }

  if (mins < 9) {
    mins = "0" + mins;
  }

  let time = hour + ":" + mins;

  return time;
}

function getDay() {
  let dayNum = currentDate.getDay();
  let day = days[dayNum];

  return day;
}

module.exports = {
  getTime,
  getDay,
};
