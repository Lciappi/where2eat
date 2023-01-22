const express = require("express");
const axios = require("axios");

const PORT = 3000;
const API_KEY = process.env.API_KEY;

const app = express();

app.get("/recommend", (req, res) => {
  let query = encodeURIComponent(req.query);
  let address = req.address;

  getCoords(address).then((location) => {
    let loc = location;

    const BASE_URL = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&location=${loc.lat}%2C${loc.lng}&radius=500&key=${API_KEY}`;

    var config = {
      method: "get",
      url: BASE_URL,
      headers: {},
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        res.json({ first: "first place" });
      })
      .catch(function (error) {
        console.log(error);
      });
  });
});

app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));
