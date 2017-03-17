$(document).ready(function() {

  function init() {
    var dest = document.getElementById('destField');
    var autocomplete = new google.maps.places.Autocomplete(dest);
  }

  function dest() {

    var initial = document.getElementById('initField');
    var autocomplete = new google.maps.places.Autocomplete(initial);
  }
  google.maps.event.addDomListener(window, 'load', init);
  google.maps.event.addDomListener(window, 'load', dest);

  function doGeocode(addr) {
    // Get geocoder instance
    var geocoder = new google.maps.Geocoder();

    // Geocode the address
    geocoder.geocode({
      'address': addr.value
    }, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK && results.length > 0) {

        // set it to the correct, formatted address if it's valid
        addr.value = results[0].formatted_address;
        return true;
      // show an error if it's not
      }
      return false;
    });
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

  function checkPrice(dest, initial) {
    if (doGeocode(dest.value) && doGeocode(initial.value)) {
      console.log("Dest: " + dest.value);
      console.log("Init: " + initial.value);
    } else {
      alert("Invalid locations!");
    }
  }

});