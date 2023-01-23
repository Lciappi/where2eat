import { raw } from "express";

const MAX_RESULTS = 2;

export function isOpen(place) {
  return place.opening_hours.open_now;
}

export function buildResponse(results, query, time, durations) {
  let cleanResponse = {
    prompt: query,
    time: time,
  };
  cleanResponse["places"] = trimPlaces(results.places);

  cleanResponse.places[0]["distance"] = durations.distances[0];
  cleanResponse.places[1]["distance"] = durations.distances[1];
  cleanResponse.places[2]["distance"] = durations.distances[2];

  cleanResponse.places[0]["driving_duration"] = durations.driving_durations[0];
  cleanResponse.places[1]["driving_duration"] = durations.driving_durations[1];
  cleanResponse.places[2]["driving_duration"] = durations.driving_durations[2];

  cleanResponse.places[0]["walking_duration"] = durations.walking_durations[0];
  cleanResponse.places[1]["walking_duration"] = durations.walking_durations[1];
  cleanResponse.places[2]["walking_duration"] = durations.walking_durations[2];

  return cleanResponse;
}

export function getTopThree(results) {
  var placesObj = { places: {} };
  const max = MAX_RESULTS > results.length ? results.length : MAX_RESULTS;
  let currentLength = 0;
  let minRatedIndex = 0;
  let currPlace;

  for (let i = 0; i < results.length; i++) {
    currPlace = results[i];

    if (currentLength <= max) {
      placesObj.places[i] = currPlace;
    } else {
      if (currPlace.rating > placesObj.places[minRatedIndex].rating) {
        placesObj.places[minRatedIndex] = currPlace;
      }
    }

    minRatedIndex = getMinRatedIndex(placesObj.places);
    currentLength++;
  }

  return placesObj;
}

function getMinRatedIndex(places) {
  let currMin = places[0].rating;
  let minRatedIndex = 0;

  for (let i = 0; i < places.length; i++) {
    if (places[i].rating < currMin) {
      minRatedIndex = i;
      currMin = places[i].rating;
    }
  }
  return minRatedIndex;
}

function trimPlaces(rawPlaces) {
  var trimmedPlaces = {};
  for (let i = 0; i <= MAX_RESULTS; i++) {
    trimmedPlaces[i] = trimPlace(rawPlaces[i]);
  }

  return trimmedPlaces;
}

function trimPlace(place) {
  const trimmedPlace = {
    name: place.name,
    address: place.formatted_address,
    open_now: place.opening_hours.open_now,
    rating: place.rating,
    price_level: place.price_level,
    photos: place.photos,
  };
  return trimmedPlace;
}

export function getBest(places) {
  let maxVotes = 0;
  let maxPlaceIndex = 0;
  for (let i = 0; i <= MAX_RESULTS; i++) {
    if (places[i].votes[0] - places[i].votes[1] > maxVotes) {
      maxPlaceIndex = i;
      maxVotes = places[i].votes[0] - places[i].votes[1];
    }
  }
  return maxPlaceIndex;
}

export function updateBest(places, best) {
  for (let i = 0; i < places.length; i++) {
    if (i == best) {
      places[i]['isBest'] = true;
    } else {
      places[i]['isBest'] = false;
    }
  }
}