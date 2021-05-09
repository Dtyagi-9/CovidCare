require("dotenv").config();
const moment = require("moment");
const axios = require("axios");

var PINCODE;
var AGE;
exports.checker = async (age, pin, res) => {
  PINCODE = pin;
  AGE = age;
  try {
    const validSlotAns = await checkAvailability();
    return validSlotAns;
  } catch (e) {
    return {
      status: false,
      error: e
    };
  }
};

async function fetchNext10Days() {
  let dates = [];
  let today = moment();
  for (let i = 0; i < 10; i++) {
    let dateString = today.format("DD-MM-YYYY");
    dates.push(dateString);
    today.add(1, "day");
  }
  return dates;
}

async function checkAvailability() {
  let datesArray = await fetchNext10Days();
  var AllSlots = [];

  var slotStatus = await Promise.all(
    datesArray.map(async date => {
      var slotData = await getSlotsForDate(date);
      if (slotData != undefined) {
        //console.log(slotData);
        AllSlots.push(slotData);
      }
      return true;
    })
  );

  return AllSlots;
}

async function getSlotsForDate(DATE) {
  let config = {
    method: "get",
    url:
      "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=" +
      PINCODE +
      "&date=" +
      DATE,
    headers: {
      accept: "application/json",
      "Accept-Language": "hi_IN"
    }
  };

  var data = await axios(config)
    .then(function(slots) {
      let sessions = slots.data.sessions;
      let validSlots = sessions.filter(
        slot => slot.min_age_limit <= AGE && slot.available_capacity > 0
      );

      if (validSlots.length > 0) {
        return validSlots;
      }
    })
    .catch(function(error) {
      console.log(error);
    });
  if (data !== undefined) {
    //console.log(data);
    return data;
  }
}
