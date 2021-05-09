console.log("Client side javascript file is loaded!");
var url = "http://localhost:3004/weather?add=";
// fetch('http://localhost:3004/weather?add=ghaziabad').then((res)=>{
//     res.json().then((data)=>{
//         // console.log(data)
//         if(data.error){
//             console.log(data.error)
//         }
//         else{
//             console.log(data.Location)
//             console.log(data.forecast.summary)

//         }
//     })
// })

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
  url = "http://localhost:3005/vaccine?pin=";
  e.preventDefault();
  const age = age_cont.value;
  const pin = pin_cont.value;
  //console.log(pin);
  url = url + pin + "&age=" + age;

  fetch(url).then(res => {
    res.json().then(data => {
      //console.log(data);
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
