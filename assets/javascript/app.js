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

// $(document).on("keypress", "#ending-event", function(event) {
//   event.preventDefault();

//   var keycode = event.keycode ? event.keycode : event.which;
//   if (keycode === "13") {
//     submitFunction();
//   }
// });

$(document).on("click", "#submit", submitFunction);

function submitFunction() {
  event.preventDefault();
  $("#google-card").toggle();
  startInput = $("#starting-location").val();
  endInput = $("#ending-location").val();

  console.log(startInput);
  console.log(endInput);
  initMap();
  calculateRoute(startInput, endInput);

  //https://maps.googleapis.com/maps/api/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood&key=AIzaSyAkhYXD2uGMFang4DjMfM4rR8qfnEDhM6c
  var queryURL =
    "https://maps.googleapis.com/maps/api/directions/json?origin=" +
    startInput +
    "&destination=" +
    endInput +
    "&key=AIzaSyAkhYXD2uGMFang4DjMfM4rR8qfnEDhM6c";

  $.ajax({
    url: queryURL,
    dataType: "json",
    method: "GET"
  }).then(function(response) {
    var results = response.data;
    console.log(results);
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
}

/* Google Map Functions */

/*
function initMap() {
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();
    var chicago = new google.maps.LatLng(41.850033, -87.6500523);
    var mapOptions = {
        zoom: 7,
        center: chicago
    }
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    directionsDisplay.setMap(map);
}

function calcRoute() {
    var start = document.getElementById('start').value;
    var end = document.getElementById('end').value;
    var request = {
        origin: start,
        destination: end,
        travelMode: 'DRIVING'
    };
    directionsService.route(request, function (result, status) {
        if (status == 'OK') {
            directionsDisplay.setDirections(result);
        }
    });
}
*/
