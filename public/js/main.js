$(document).ready(function() {

  function autocompleteStartLocation() {
    var dest = document.getElementById('destField');
    var autocomplete = new google.maps.places.Autocomplete(dest);
  }

  function autocompleteDestination() {
    var initial = document.getElementById('initField');
    var autocomplete = new google.maps.places.Autocomplete(initial);
  }
  google.maps.event.addDomListener(window, 'load', autocompleteStartLocation);
  google.maps.event.addDomListener(window, 'load', autocompleteDestination);

  var startLat = "";
  var startLong = "";
  var destLat = "";
  var destLong = "";
  var counter = 0;
  //Google maps api to validate address and get lat/long
  function checkPrice(dest, initial) {
    // Get geocoder instance
    var geocoder = new google.maps.Geocoder();
    counter = 1;
    // Geocode the address
    geocoder.geocode({
      'address': dest.value
    }, destinationResults);

    geocoder.geocode({
      'address': initial.value
    }, startLocationResults);


  }

  function comparePrices() {
    $.ajax({
      method: 'POST',
      url: "/search",
      type: 'json',
      data: {
        startLatitude: startLat,
        startLongitude: startLong,
        endLatitude: destLat,
        endLongitude: destLong
      },
      success: showResults,
    });
  }

  function showResults(data, code, jqXHR) {

    console.log(data);

  }

  function destinationResults(results, status) {
    if (status === google.maps.GeocoderStatus.OK && results.length > 0) {

      destLat = results[0].geometry.location.lat();
      destLong = results[0].geometry.location.lng();
      counter -= 1;
      if (counter == 0) {
        comparePrices();
      }
    // show an error if it's not
    } else {
      console.log(status);
      console.log(results);
    }
  }



  function startLocationResults(results, status) {
    if (status === google.maps.GeocoderStatus.OK && results.length > 0) {
      startLat = results[0].geometry.location.lat();
      startLong = results[0].geometry.location.lng();
      counter -= 1;
      if (counter == 0) {
        comparePrices();
      }
    // show an error if it's not
    } else {
      console.log(status);
      console.log(results);
    }
  }


  $('#search').click(function() {
    var dest = document.getElementById('destField');
    var initial = document.getElementById('initField');
    if (dest.value == "" || initial.value == "") {
      alert("Location values must be set!");
    } else {
      checkPrice(dest, initial);
    }
  });

});