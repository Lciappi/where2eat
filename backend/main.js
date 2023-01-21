var map;
var geocoder;
var service;
var infowindow;

var coords;
var query;
var time = 'December 17, 2020 03:24:00';
var address;

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
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      console.log(place);
      // console.log(await place.opening_hours.isOpen());
      const isOpenAtTime = place.opening_hours.isOpen(new Date(time));
      // console.log(isOpenAtTime);
    }
  }
  await service.getDetails({
    placeId: 'ChIJLX5RgE5xhlQRdaZexuM3W-w',
    fields: ['opening_hours'],
    }, function (place, status) {
      if (status !== 'OK') return; // something went wrong
      const isOpenAtTime = place.opening_hours.isOpen(new Date('December 17, 2020 03:24:00'));
      console.log(isOpenAtTime);
  
      const isOpenNow = place.opening_hours.isOpen();
      if (isOpenNow) {
          // We know it's open.
      }
  });
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

function formatTime(time) {

}
