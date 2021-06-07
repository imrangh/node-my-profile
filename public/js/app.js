//const { response } = require("express");

console.log("Clientside javascript file is loaded!");

fetch("http://puzzle.mead.io/puzzle").then((response) => {
  response.json().then((data) => {
    console.log(data);
  });
});

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  console.log("Testing...: " + location);

  fetch(`http://localhost:3000/search?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error);
        messageOne.textContent = "Error: " + data.error;
        messageTwo.textContent = "";
      } else {
        console.log(data.forecast);
        console.log(data.geocodeData);
        messageTwo.textContent = ` $In ${data.geocodeData.location}, ${data.forecast}, The Latitude is ${data.geocodeData.latitude} and Longitude is ${data.geocodeData.longitude}`;
        messageOne.textContent = "";
      }
    });
  });
});
