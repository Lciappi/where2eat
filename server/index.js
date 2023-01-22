const express = require("express");
const axios = require("axios");

const PORT = 5050;
const API_KEY = "AIzaSyCxfqw7KcnonT2CCLi6Y7CfJpr2GULAJ_M";
const GEOCODE_BASE_URL = "https://maps.googleapis.com/maps/api/geocode/json";
const TEXTSEARCH_BASE_URL = "https://maps.googleapis.com/maps/api/place/textsearch/json";

const app = express();

app.get("/recommend", (req, res) => {
<<<<<<< HEAD
  let query = encodeURIComponent(req.params.query);
  let address = req.params.address;
=======
  let query = encodeURIComponent(req.query);
  const address = req.address;
  const radius = req.radius;
>>>>>>> a867c93e108ce6b1b40377e88a41ceaf24a79acd

  getCoords(address).then((location) => {
    if (location == null) {
      res.status(500);
      return res.json({error: "No address found"});
    }

    const requestUrl = TEXTSEARCH_BASE_URL + `?query=${query}&location=${location.lat}%2C${location.lng}&radius=${radius}&key=${API_KEY}`;

    var config = {
      method: "get",
      url: requestUrl,
      headers: {},
    };

    axios(config)
<<<<<<< HEAD
      .then((response) => {
        console.log("#############")
        console.log(response);
        console.log("#############")
        res.status(200).send({ data: response.data });
=======
      .then(function (response) {
        res.json({ first: "first place" });
>>>>>>> a867c93e108ce6b1b40377e88a41ceaf24a79acd
      })
      .catch((error) => {
        console.err(error);
      });
  });
});

function getCoords(address) {
  const encodedAddress = encodeURIComponent(address);
  const requestUrl =
    GEOCODE_BASE_URL + "?address=" + encodedAddress + `&key=${API_KEY}`;

    console.log(address);
    console.log(encodedAddress);
  return axios.get(requestUrl).then((response) => {
<<<<<<< HEAD
    console.log(response.data.results);
    return response.data.results[0].geometry.location;
=======
    if (response.status != 200) {
      return null;
    } else {
      return response.data.results[0].geometry.location;
    }
>>>>>>> a867c93e108ce6b1b40377e88a41ceaf24a79acd
  });
}



app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));