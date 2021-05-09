console.log("Client side javascript file is loaded!");
var url = "http://localhost:3004/weather?add=";

const form = document.querySelector("form");
// const search = document.querySelector('input')
// console.log(search)
const pin_cont = document.getElementById("pin");
const age_cont = document.getElementById("age");

const message_location = document.querySelector("#location");
const message_forecast = document.querySelector("#forecast");

// message_location.textContent = 'You will see your result here!'
form.addEventListener("submit", e => {
  message_location.textContent = "Loading...";
  message_forecast.textContent = "";
  url = "https://covidcare-iiitu.herokuapp.com/vaccine?pin=";
  e.preventDefault();
  const age = age_cont.value;
  const pin = pin_cont.value;
  url = url + pin + "&age=" + age;

  fetch(url).then(res => {
    res.json().then(data => {
      const output = JSON.stringify(data);
      if (data.error) {
        console.log(data.error);
        message_location.textContent = "Error";
        message_forecast.textContent = data.error;
      } else {
        message_location.textContent = output;
        //message_forecast.textContent = data.data;
      }
    });
  });
});
