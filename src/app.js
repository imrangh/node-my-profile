const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Imran Portfolio",
    name: "Imran Ismail",
  });
});

// app.get("/weather", (req, res) => {
//   res.render("weather", {
//     title: "Weather",
//     name: "Imran Ismail",
//   });
// });

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Imran Ismail",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Imran Ismail",
  });
});

app.get("/weather", (req, res) => {
  res.render("weather", {
    title: "Weather",
    name: "Imran Ismail",
  });
});

app.get("/search", (req, res) => {
  if (!req.query.address) {
    res.send({
      error: "You must provide a geocode address",
    });
  } else {
    geocode(req.query.address, (error, geocodeData = {}) => {
      if (error) {
        res.send({ error });
      } else {
        forecast(geocodeData.location, (error, forecastData = "") => {
          if (error) {
            res.send({ error });
          } else {
            res.send({
              geocodeData: geocodeData,
              forecast: forecastData,
              title: "Weather",
              name: "Imran Ismail",
            });
          }
        });
      }
    });
  }
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "Page not found!",
    name: "Imran Ismail",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
