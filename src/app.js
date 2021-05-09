const path = require("path");
const express = require("express");
const hbs = require("hbs");
const app = express();
const VaccineChecker = require("./utils/vaccineChecker.js");
//path config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");
const port = process.env.PORT || 3005;
var PINCODE;
var AGE;

//handlebar setup and location setup
app.set("views", viewPath);
app.set("view engine", "hbs");

hbs.registerPartials(partialPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

//rendering dynamic webpages
app.get("", (req, res) => {
  res.render("index", {
    title: "CovidCare",
    name: "Dev Tyagi"
  });
});

app.get("/updates", (req, res) => {
  res.render("updates", {
    title: "CovidCare",
    name: "Dev Tyagi"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "How can I help you ? ",
    title: "help",
    name: "Dev Tyagi"
  });
});

app.get("/vac_json", async (req, res) => {
  if (!req.query.pin) {
    return res.send({
      error: "Please search with pin code and age"
    });
  }
  const { age, pin } = req.query;
  const result = await VaccineChecker.checker(age, pin);
  //console.log(result);
  res.status(200).json(result);
});

app.get("/vaccine", async (req, res) => {
  if (!req.query.pin) {
    return res.send({
      error: "Please search with pin code and age"
    });
  }
  const { age, pin } = req.query;
  const result = await VaccineChecker.checker(age, pin);
  //console.log(result);
  res.status(200).json(result);
});

app.get("/help/*", (req, res) => {
  res.render("error_page", {
    errorMessage: "Sorry the Help page could not be found",
    title: "Page not Found!",
    name: "Dev Tyagi"
  });
});

app.get("*", (req, res) => {
  // res.send('My 404 PAge')
  res.render("error_page", {
    errorMessage: "Sorry the  page could not be found",
    title: "Page not Found!",
    name: "Dev Tyagi"
  });
});
app.listen(port, () => {
  console.log("Server is up on port " + port);
});
