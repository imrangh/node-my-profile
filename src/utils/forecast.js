const request = require("request");

const forecast = (address, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=bd36b5bef18c06949a26e6bb655c597b&query=${address}`;

  request({ url: url, json: true }, (error, response, body) => {
    if (error) {
      callback("Unable to connect to the weather service!", undefined);
    } else if (response.body.error) {
      callback("Unable to find the location", undefined);
    } else {
      callback(
        undefined,
        ` Current temperature is ${body.current.temperature}  but it feelslike ${body.current.feelslike}`
      );
    }
  });
};

module.exports = forecast;
