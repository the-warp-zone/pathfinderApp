var database = firebase.database();
// write
database.ref('users/' + userId).set(user);

// read / listen
database.child("users").on('value', function (snapshot) {
    $(document).on("click", "#submit", submitFunction);

    function writeUserData(userId, startInput, endInput, initMap(calculateRoute, calculateRoute2)) {
        firebase.database().ref('users/' + userId).set({
            startInput: startInput,
            endInput: endInput,
            initMap: calculateRoute,
            calculateRoute2,
            database.ref('users/' + userId).set(snapshot);
        });
    }
});