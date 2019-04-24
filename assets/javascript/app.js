// Variables
var map;

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
  calculateRoute2(startInput, endInput);

  var googleURL =
    "https://maps.googleapis.com/maps/api/directions/json?origin=" +
    startInput +
    "&destination=" +
    endInput +
    "&key=AIzaSyAkhYXD2uGMFang4DjMfM4rR8qfnEDhM6c";

  var queryURL = "https://cors-anywhere.herokuapp.com/" + googleURL;

  var mapquestURL = "http://open.mapquestapi.com/directions/v2/route?key=C1a3TOmczQOtn6JOIApQAx3vJ3S20kF0&from=" +
  startInput +
  "&to=" +
  endInput;

  var queryURL2 = "https://cors-anywhere.herokuapp.com/" + mapquestURL;

  $.ajax({
    url: queryURL2,
    dataType: "json",
    method: "GET"
  }).then(function(response2) {
    console.log(response2);
  });  

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
      `<p>Origin: ${startInput}</p><br><p>Destination: ${endInput}</p><br><p>Distance: ${distance}</p><br><p>Duration: ${duration}</p>`
    );
  });
}
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 30.266926, lng: -97.750519 },
    zoom: 12
  });
}

initMap();

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
}

function calculateRoute2() {
  
        L.mapquest.directions().route({
          start: startInput,
          end: endInput
        });
        
};

L.mapquest.key = 'C1a3TOmczQOtn6JOIApQAx3vJ3S20kF0';

L.mapquest.map('hybrid', {
  center: [30.266926, -97.750519],
  layers: L.mapquest.tileLayer('hybrid'),
  zoom: 12
});



