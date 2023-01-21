var map;
var service;
var infowindow;

function getQuery() {
  let prompt = document.currentScript.getAttribute("prompt");
  let address = document.currentScript.getAttribute("address");
  let time = document.currentScript.getAttribute("time");

  console.log("Prompt: " + prompt);
  console.log("Address: " + prompt);
  console.log("Time: " + prompt);

  let coords = getCoords(address);

  var location = new google.maps.LatLng(coords.lat, coords.lng);

  map = new google.maps.Map(document.getElementById("map"), {
    center: location,
    zoom: 15,
  });

  var request = {
    location: location,
    radius: "500",
    query: "I want to eat very cheap sushi",
  };

  service = new google.maps.places.PlacesService(map);
  service.textSearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      console.log(place);
    }
  }
}

function getCoords(address) {
    const request = {
        query: address,
        fields: ['geometry'],
      };

    service.findPlaceFromQuery(request, function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          return results[0].geometry.location;
        }
      });
}
