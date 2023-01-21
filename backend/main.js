var map;
var service;
var infowindow;

function initialize() {
  var vancouver = new google.maps.LatLng(49.316666, -123.066666);

  map = new google.maps.Map(document.getElementById("map"), {
    center: vancouver,
    zoom: 15,
  });

  var request = {
    location: vancouver,
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
      console.log(place.name);
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
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
          map.setCenter(results[0].geometry.location);
        }
      });
}
