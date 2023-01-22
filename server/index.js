<<<<<<< HEAD
//import { isOpen, trimResults } from "./helper.js";
=======
import { getTopThree, buildResponse } from "./helper.js";
>>>>>>> dce4bec5c5435f54c8f514f1cebe912cc0be200e
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
  let query = encodeURIComponent(req.query.query);
  const address = req.query.address;
<<<<<<< HEAD
  let radius = 500;
=======
  const radius = '500';

  const encodedQuery = encodeURIComponent(query);  
>>>>>>> dce4bec5c5435f54c8f514f1cebe912cc0be200e

  getCoords(address).then((location) => {
    if (location == null) {
      res.status(500);
      return res.json({ error: "No address found" });
    }

    const requestUrl =
      TEXTSEARCH_BASE_URL +
      `?query=${query}&location=${location.lat}%2C${location.lng}&radius=${radius}&key=${API_KEY}`;

    var config = {
      method: "get",
      url: requestUrl,
      headers: {},
    };

    axios(config)
      .then(function (response) {
        let topThree = getTopThree(response.data.results);
        const cleanResponse = buildResponse(topThree, query, time);
        res.type("application/json");
        res.status(200);
        return res.json(cleanResponse);

        // return getDuration(address, [
        //   response.data.results[0].formatted_address,
        //   response.data.results[1].formatted_address,
        //   response.data.results[2].formatted_address,
        // ]).then((durations) => {
        //   console.log("Durations: ", durations);
        //   res.type("application/json");
        //   res.status(200);
        //   return res.json(response.data.results);
        // });

        
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

function getDuration(orig, dests) {
  var config_driving = {
    method: "get",
    url: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${orig}&destinations=${dests[0]}%7C${dests[1]}%7C${dests[2]}&departure_time=now&key=${API_KEY}`,
    headers: {},
  };

  var config_walking = {
    method: "get",
    url: `https://maps.googleapis.com/maps/api/distancematrix/json?mode=walking&origins=${orig}&destinations=${dests[0]}%7C${dests[1]}%7C${dests[2]}&departure_time=now&key=${API_KEY}`,
    headers: {},
  };

  return axios(config_driving)
    .then(function (resp_drive) {
      let dur1 = resp_drive.data.rows[0].elements[0].duration.text;
      let dur2 = resp_drive.data.rows[0].elements[1].duration.text;
      let dur3 = resp_drive.data.rows[0].elements[2].duration.text;

      let dist1 = resp_drive.data.rows[0].elements[0].distance.text;
      let dist2 = resp_drive.data.rows[0].elements[1].distance.text;
      let dist3 = resp_drive.data.rows[0].elements[2].distance.text;

      let driving_durs = [dur1, dur2, dur3];
      let dists = [dist1, dist2, dist3];
      return axios(config_walking).then(function (resp_walk) {
        let dur4 = resp_walk.data.rows[0].elements[0].duration.text;
        let dur5 = resp_walk.data.rows[0].elements[1].duration.text;
        let dur6 = resp_walk.data.rows[0].elements[2].duration.text;
        let walking_durs = [dur4, dur5, dur6];
        return {
          distances: dists,
          driving_durations: driving_durs,
          walking_durations: walking_durs,
        };
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}

app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));
