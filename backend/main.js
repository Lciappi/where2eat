var map;
var geocoder;
var service;
var infowindow;

var coords;

async function getQuery() {
  geocoder = new google.maps.Geocoder();

  let prompt = document.currentScript.getAttribute("prompt");
  let address = document.currentScript.getAttribute("address");
  let time = document.currentScript.getAttribute("time");

  await geocoder.geocode({ address: address }, function(results, status) {getCoords(results, status)});

  var location = new google.maps.LatLng(coords.lat, coords.lng);

  map = new google.maps.Map(document.getElementById("map"), {
    center: location,
    zoom: 15,
  });

  service = new google.maps.places.PlacesService(map);

  var request = {
    location: location,
    radius: "500",
    query: "I want to eat very cheap sushi",
  };

  service.textSearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      // console.log(place);
    }
  }
}

async function getCoords(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    coords = {
      lat: results[0].geometry.location.lat(),
      lng: results[0].geometry.location.lng()
    };
  } else {
    alert("Geocode was not successful for the following reason: " + status);
  }
}
