const express = require("express");
const axios = require("axios");

const PORT = 5050;
const API_KEY = "AIzaSyCxfqw7KcnonT2CCLi6Y7CfJpr2GULAJ_M";
const GEOCODE_BASE_URL = "https://maps.googleapis.com/maps/api/geocode/json";

const app = express();

app.get("/recommend", (req, res) => {
  let query = encodeURIComponent(req.params.query);
  let address = req.params.address;

  getCoords(address).then((location) => {
    let loc = location;

    const BASE_URL = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&location=${loc.lat}%2C${loc.lng}&radius=500&key=${API_KEY}`;

    var config = {
      method: "get",
      url: BASE_URL,
      headers: {},
    };

    axios(config)
      .then((response) => {
        console.log("#############")
        console.log(response);
        console.log("#############")
        res.status(200).send({ data: response.data });
      })
      .catch((error) => {
        console.err(error);
      });
  });
});

app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));

function getCoords(address) {
  const encodedAddress = encodeURIComponent(address);
  const requestUrl =
    GEOCODE_BASE_URL + "?address=" + encodedAddress + `&key=${API_KEY}`;

    console.log(address);
    console.log(encodedAddress);
  return axios.get(requestUrl).then((response) => {
    console.log(response.data.results);
    return response.data.results[0].geometry.location;
  });
  coords = {
    lat: results[0].geometry.location.lat(),
    lng: results[0].geometry.location.lng(),
  };
}
