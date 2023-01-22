import { isOpen, trimResults } from './helper.js'
import express from 'express';
import axios from 'axios';

const PORT = 5050;
const API_KEY = "AIzaSyCxfqw7KcnonT2CCLi6Y7CfJpr2GULAJ_M";
const GEOCODE_BASE_URL = "https://maps.googleapis.com/maps/api/geocode/json";
const TEXTSEARCH_BASE_URL = "https://maps.googleapis.com/maps/api/place/textsearch/json";

const app = express();

app.get("/recommend", (req, res) => {
  let query = encodeURIComponent(req.body.query);
  const address = req.body.address;
  const radius = req.body.radius;

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
      .then(function (response) {
        trimResults(response.data.results);
        res.json({ first: "first place" });
      })
      .catch(function (error) {
        console.log(error);
      });
  });
});

function getCoords(address) {
  const encodedAddress = encodeURIComponent(address);
  const requestUrl =
    GEOCODE_BASE_URL + "?address=" + encodedAddress + `&key=${API_KEY}`;

  return axios.get(requestUrl).then((response) => {
    if (response.status != 200) {
      return null;
    } else {
      return response.data.results[0].geometry.location;
    }
  });
}



app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));