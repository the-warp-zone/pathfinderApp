// Variables
var map;
var map2;
let startInput = "";
let endInput = "";
let distance = "";
let googleObj = {
  distance: "",
  route: ""
};
let tomTomObj = {
  distance: "",
  route: ""
};
let appleObj = {
  distance: "",
  route: ""
};

$(document).on("click", "#submit", submitFunction);

function submitFunction() {
  event.preventDefault();
  startInput = $("#starting-location").val();
  endInput = $("#ending-location").val();

  console.log(startInput);
  console.log(endInput);
  initMap();
  calculateRoute(startInput, endInput);

  var originalURL =
    "https://maps.googleapis.com/maps/api/directions/json?origin=" +
    startInput +
    "&destination=" +
    endInput +
    "&key=AIzaSyAkhYXD2uGMFang4DjMfM4rR8qfnEDhM6c";

  var queryURL = "https://cors-anywhere.herokuapp.com/" + originalURL;

  $.ajax({
    url: queryURL,
    dataType: "json",
    method: "GET"
  }).then(function(response) {
    console.log(response);
    let routes = response.routes;
    console.log(routes);
    let distance = routes[0].legs[0].distance.text;
    console.log(distance);
    let duration = routes[0].legs[0].duration.text;
    console.log(duration);

    // Display Data on card
    $(".google-card").html(
      `<p>Origin:${startInput}</p><br><p>Destination: ${endInput}</p><br><p>Distance: ${distance}</p><br><p>Duration: ${duration}</p>`
    );
  });
}
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8
  });
}

function calculateRoute(start, end) {
  var myOptions = {
    zoom: 10,
    center: new google.maps.LatLng(30.26, -97.74),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  // Draw the map
  var mapObject = new google.maps.Map(
    document.getElementById("map"),
    myOptions
  );

  var directionsService = new google.maps.DirectionsService();
  var directionsRequest = {
    origin: start,
    destination: end,
    travelMode: google.maps.DirectionsTravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.METRIC
  };
  directionsService.route(directionsRequest, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      new google.maps.DirectionsRenderer({
        map: mapObject,
        directions: response
      });
    } else console.log("Unable To Find Root");
    
  });
  L.mapquest.key = 'C1a3TOmczQOtn6JOIApQAx3vJ3S20kF0';

// 'map' refers to a <div> element with the ID map
L.mapquest.map('hybrid', {
  center: [30.266926, -97.750519],
  layers: L.mapquest.tileLayer('hybrid'),
  zoom: 12
});
}


