import dotenv from 'dotenv';
import { getTopThree, buildResponse, getBest, getFormattedAdresses} from "./helper.js";
import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import cors from "cors";

dotenv.config();

const PORT = 5050;
const API_KEY = process.env.API_KEY;
const GEOCODE_BASE_URL = "https://maps.googleapis.com/maps/api/geocode/json";
const TEXTSEARCH_BASE_URL =
  "https://maps.googleapis.com/maps/api/place/textsearch/json";
const DISTMTX_BASE_URL = "https://maps.googleapis.com/maps/api/distancematrix/json";

const ROOMS = {};

const app = express();

app.use(cors());

var jsonParser = bodyParser.json();

app.get("/results", (req, res) => {
  res.type("application/json");
  res.status(200);
  getBest(ROOMS[req.query.room].places);
  return res.json(ROOMS[req.query.room]);
});

app.post("/vote", (req, res) => {
  ROOMS[req.query.room].places[req.query.place].votes[req.query.voteIdx] += 1;
  res.status(200).send("success");
});

app.post("/create", jsonParser, (req, res) => {
  if (req.query.room != "-1") {
    console.log("Room number: ", req.query.room);

    res.type("application/json");
    res.status(200);
    return res.json(ROOMS[req.query.room]);
  }

  let room_number = Math.floor(Math.random() * 10000).toString();
  console.log("Creating room: ", room_number);

  res.type("application/json");
  const query = req.query.query;
  const time = req.query.time;
  const address = req.query.address;
  const radius = "500";
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
        getJourneyInfo(address, topThree.places).then((durations) => {
          const cleanResponse = buildResponse(topThree, query, time, durations);
          cleanResponse["room"] = room_number;
          res.type("application/json");
          res.status(200);
          ROOMS[room_number] = cleanResponse;
          return res.json(cleanResponse);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  });
});

async function getCoords(address) {
  const encodedAddress = encodeURIComponent(address);
  const requestUrl =
    GEOCODE_BASE_URL + "?address=" + encodedAddress + `&key=${API_KEY}`;

  const response = await axios.get(requestUrl);
  if (response.status != 200) {
    return null;
  } else {
    return response.data.results[0].geometry.location;
  }
}

function getJourneyInfo(orig, places) {
  const dests = [];
  getFormattedAdresses(places, dests);
  
  var config_driving = {
    method: "get",
    url: DISTMTX_BASE_URL + `?origins=${encodeURIComponent(orig)}&destinations=`
    + `${encodeURIComponent(dests[0])}%7C${encodeURIComponent(dests[1])}%7C`
    + `${encodeURIComponent(dests[2])}&departure_time=now&key=${API_KEY}`,
    headers: {},
  };

  var config_walking = {
    method: "get",
    url: DISTMTX_BASE_URL + `?mode=walking&origins=${encodeURIComponent(orig)}&destinations=`
    + `${encodeURIComponent(dests[0])}%7C${encodeURIComponent(dests[1])}%7C`
    + `${encodeURIComponent(dests[2])}&departure_time=now&key=${API_KEY}`,
    headers: {},
  };

  return axios(config_driving)
    .then(function (resp_drive) {
      const drivingDurations = [];
      const distances = [];
      for (let i = 0; i < 3; i++) {
        drivingDurations.push(resp_drive.data.rows[0].elements[i].duration.text);
        distances.push(resp_drive.data.rows[0].elements[i].distance.text);
      }
      return axios(config_walking).then(function (resp_walk) {
        const walkingDurations = [];
        for (let i = 0; i < 3; i++) {
          walkingDurations.push(resp_walk.data.rows[0].elements[i].duration.text);
        }
        return {
          distances: distances,
          driving_durations: drivingDurations,
          walking_durations: walkingDurations,
        };
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}

app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));
