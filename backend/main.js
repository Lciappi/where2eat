var map;
var geocoder;
var service;
var infowindow;

var query;
var time = 'December 17, 2020 03:24:00';
var address;

var coords;
var placesObj = {places: {}};

const MAX_RESULTS = 5;

async function getQuery() {
  geocoder = new google.maps.Geocoder();

  query = document.currentScript.getAttribute("prompt");
  address = document.currentScript.getAttribute("address");
  // time = document.currentScript.getAttribute("time");

  await geocoder.geocode({ address: address }, function(results, status) {getCoords(results, status)});

  var location = new google.maps.LatLng(coords.lat, coords.lng);

  map = new google.maps.Map(document.getElementById("map"), {
    center: location,
    zoom: 15,
  });

  service = new google.maps.places.PlacesService(map);

  var request = {
    location: location,
    radius: "1000",
    query: "I want to eat very cheap sushi",
  };

  await service.textSearch(request, searchResponse);
}

async function searchResponse(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    const maxResults = (MAX_RESULTS > results.length)? results.length : MAX_RESULTS;
    trimResults(maxResults, results);

    console.log(placesObj);
  } else {
    // TODO: error handling
    alert("Search was not successful for the following reason: " + status);
  }
}

async function getCoords(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    coords = {
      lat: results[0].geometry.location.lat(),
      lng: results[0].geometry.location.lng()
    };
  } else {
    // TODO: error handling
    alert("Geocode was not successful for the following reason: " + status);
  }
}

function isOpen(place) {
  return place.opening_hours.open_now;
}

function trimResults(max, results) {
  let currentLength = 0;
  let minRatedIndex = 0;
  
  for (let i = 0; i < results.length; i++) {
    currPlace = results[i];

    if (currentLength <= max) {
      placesObj.places[i] = currPlace;

      if (currPlace.rating < placesObj.places[minRatedIndex].rating) minRatedIndex = i;

    } else {
      if (currPlace.rating > placesObj.places[minRatedIndex].rating) {
        placesObj.places[minRatedIndex] = currPlace;
      }
    }
    
    currentLength++;
  }
}