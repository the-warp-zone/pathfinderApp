// Variables
var map;
var map2;
var mapQuestLayer;
let startInput = "";
let endInput = "";
var googleBool = false;
var mapQuestBool = false;

firebase.auth().onAuthStateChanged(user => {
  if(!user) {
    window.location = 'index.html'; //If User is not logged in, redirect to login page
  }
});


document.getElementById("logoutBtn").addEventListener("click", fbaseLogout);
document.getElementById("mobileLogoutBtn").addEventListener("click", fbaseLogout);

function fbaseLogout() {
  firebase.auth().signOut();
}



$(document).on("click", "#submit", submitFunction);
$(document).on("click", "#google-link", function () {
  if (googleBool) {
    var googleURL = "https://www.google.com/maps/dir/?api=1&origin=" + startInput + "&destination=" + endInput + "&travelmode=driving";
    window.location.assign(googleURL);
  }
});

$(document).on("click", "#mapQuest-link", function () {
  if (mapQuestBool) {
    var mapQuestURL = "http://www.mapquest.com/directions?saddr=" + startInput + "&daddr=" + endInput + "&maptype=map";
    window.location.href = mapQuestURL;
  }
});

$(function () {
  $("form").submit(function () {
    return false;
  });
});

function submitFunction() {
  googleBool = true;
  mapQuestBool = true;
  event.preventDefault();
  startInput = $("#starting-location").val();
  endInput = $("#ending-location").val();
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

  var mapquestURL =
    "http://open.mapquestapi.com/directions/v2/route?key=C1a3TOmczQOtn6JOIApQAx3vJ3S20kF0&from=" +
    startInput +
    "&to=" +
    endInput;

  var queryURL2 = "https://cors-anywhere.herokuapp.com/" + mapquestURL;

  $.ajax({
    url: queryURL2,
    dataType: "json",
    method: "GET"
  }).then(function (response2) {
    console.log(response2);
    let route = response2.route;
    let distance = route.distance;
    let duration = route.formattedTime;
    $(".mapquest-card").html(
      `<p>Origin: ${startInput}</p><br><p>Destination: ${endInput}</p><br><p>Distance: ${distance}</p><br><p>Duration: ${duration}</p>`
    );
  });

  $.ajax({
    url: queryURL,
    dataType: "json",
    method: "GET"
  }).then(function (response) {
    let routes = response.routes;
    console.log(response);
    let distance = routes[0].legs[0].distance.text;
    let duration = routes[0].legs[0].duration.text;

    // Display Data on card
    $(".google-card").html(
      `<p>Origin: ${startInput}</p><br><p>Destination: ${endInput}</p><br><p>Distance: ${distance}</p><br><p>Duration: ${duration}</p>`
    );
  });
}

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: {
      lat: 30.266926,
      lng: -97.750519
    },
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
  directionsService.route(directionsRequest, function (response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      new google.maps.DirectionsRenderer({
        map: mapObject,
        directions: response
      });
    } else console.log("Error: Unable To Find Root");
  });
}

function calculateRoute2() {
  L.mapquest.directions().route({
    start: startInput,
    end: endInput
  }, function (err, data) {
    if (err.message)
      console.log(err);
    else {
      if (mapQuestLayer) {
        map2.removeLayer(mapQuestLayer);
      }
      mapQuestLayer = L.mapquest.directionsLayer({
        directionsResponse: data
      }).addTo(map2);
    }
  });

}

L.mapquest.key = 'C1a3TOmczQOtn6JOIApQAx3vJ3S20kF0';

map2 = L.mapquest.map("hybrid", {
  center: [30.266926, -97.750519],
  layers: L.mapquest.tileLayer("hybrid"),
  zoom: 12
});
