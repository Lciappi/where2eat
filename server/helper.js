var placesObj = { places: {} };

const MAX_RESULTS = 2;

export function isOpen(place) {
  return place.opening_hours.open_now;
}

export function buildResponse(places, query, time) {
  let cleanResponse = {};

  cleanResponse['prompt'] = query;
  cleanResponse['time'] = time;
  cleanResponse['places'] = trimPlaces(places);

  return cleanResponse;
}

export function getTopThree(results) {
  const max =
    MAX_RESULTS > results.length ? results.length : MAX_RESULTS;
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

function trimPlaces(places) {
  let trimmedPlaces = {};
  
}
