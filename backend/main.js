var map;
var geocoder;
var service;
var infowindow;

async function getQuery() {
  geocoder = new google.maps.Geocoder();

  let prompt = document.currentScript.getAttribute("prompt");
  let address = document.currentScript.getAttribute("address");
  let time = document.currentScript.getAttribute("time");

  console.log("Prompt: " + prompt);
  console.log("Address: " + prompt);
  console.log("Time: " + prompt);

  let coords = await getCoords(address);
  console.log(coords);

  var location = new google.maps.LatLng(49.2887722, -123.1217156);
  
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

async function getCoords(address) {
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      console.log(results);
      var lat = results[0].geometry.location.lat();
      var lng = results[0].geometry.location.lng();
      var returnBody = {
        'lat': lat,
        'lng': lng
      };
      console.log(returnBody);
      return returnBody;
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}
