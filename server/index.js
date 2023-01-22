require('dotenv').config();
const express = require("express");
const axios = require("axios");

const PORT = 3000;
const API_KEY = process.env.API_KEY;

const app = express();

app.get("/recommend", (req, res) => {
  const BASE_URL = `https://maps.googleapis.com/maps/api/place/textsearch/json
    ?location=42.3675294%2C-71.186966
    &query=123%20main%20street
    &radius=10000
    &key=${API_KEY}`;

  return axios.get(BASE_URL).then((response) => {
    console.log(repsonse);
    res.json({ first: "first place" });
  });
});

app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));
