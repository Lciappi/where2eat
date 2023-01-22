import { isOpen, getTopThree } from "./helper.js";
import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import cors from "cors";

const PORT = 5050;
const API_KEY = "AIzaSyCxfqw7KcnonT2CCLi6Y7CfJpr2GULAJ_M";
const GEOCODE_BASE_URL = "https://maps.googleapis.com/maps/api/geocode/json";
const TEXTSEARCH_BASE_URL =
  "https://maps.googleapis.com/maps/api/place/textsearch/json";

const app = express();

app.use(cors());

var jsonParser = bodyParser.json();

app.post("/recommend", jsonParser, (req, res) => {
  res.type("application/json");
  const query = req.query.query;
  const time = req.query.time;
  const address = req.query.address;
  const radius = 500;

  const encodedQuery = encodeURIComponent(query);  

  getCoords(address).then((location) => {
    if (location == null) {
      res.status(500);
      return res.json({ error: "No address found" });
    }

    const requestUrl =
      TEXTSEARCH_BASE_URL +
      `?query=${encodedQuery}&location=${location.lat}%2C${location.lng}&radius=${radius}&key=${API_KEY}`;

    var config = {
      method: "get",
      url: requestUrl,
      headers: {},
    };

    axios(config)
      .then(function (response) {
        let topThree = getTopThree(response.data.results);
        topThree = buildResponse(topThree, query, time);
        res.type("application/json");
        res.status(200);
        return res.json(topThree);
      })
      .catch((error) => {
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
