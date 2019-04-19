// Variables
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

function submitFunction() {
  startInput = $("#starting-location").val();
  endInput = $("#ending-location").val();

  console.log(startInput);
  console.log(endInput);
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
