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
    }, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK && results.length > 0) {

        destLat = results[0].geometry.location.lat();
        destLong = results[0].geometry.location.lng();
        geocoder.geocode({
          'address': initial.value
        }, startLocationResults);
      // show an error if it's not
      } else {
        console.log(status);
        console.log(results);
      }
    });




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

  function parseLyft(lyftResults, lyftMin) {
    var high_price = parseInt(lyftResults["estimated_cost_cents_max"]);
    var low_price = parseInt(lyftResults["estimated_cost_cents_min"]);
    //divide by 200 because in cents
    var average_price = Math.round((high_price + low_price) / 200);

    $('#lyftPrice').append(lyftResults["display_name"] + ": " + "$" + average_price + '\n');
    if (lyftMin > average_price) {
      return average_price;
    }
    return lyftMin;
  }
  function showResults(data, code, jqXHR) {
    var uberPrices = {};
    var uberResults = data["results"]["uber"]
    var lyftResults = data["results"]["lyft"][0]
    var lineResults = data["results"]["lyft_line"][0]
    var plusResults = data["results"]["lyft_plus"][0]
    /*Show three columns and new title*/
    $('.choose').css('display', 'block');

    $('.columns').css('display', 'block');


    // $('#uber_image').css("background-image", "images/uber.jpg");
    // $('#lyft_image').css("background-image", "images/lyft.jpg");

    var uber_min = 1000000000;

    for (var i = 0; i < uberResults.length; i++) {
      var high_price = parseInt(uberResults[i]["high_estimate"]);
      var low_price = parseInt(uberResults[i]["low_estimate"]);
      var average_price = Math.round((high_price + low_price) / 2);
      uberPrices[uberResults[i]["display_name"]] = average_price;
      $('#uberPrice').append(uberResults[i]["display_name"] + ": " + "$" + average_price + '\n')

      if (average_price < uber_min) {
        uber_min = average_price;
      }
    }

    var lyft_min = 100000000;
    lyft_min = parseLyft(lyftResults, lyft_min);
    lyft_min = parseLyft(lineResults, lyft_min);
    lyft_min = parseLyft(plusResults, lyft_min);

    if (lyft_min < uber_min) {
      $('#title').text('Lyft is cheaper! It costs about $' + lyft_min);
    } else if (lyft_min == uber_min) {
      $('#title').text('They are about the same price! They cost $' + uber_min);
    } else {
      $('#title').text('Uber is cheaper! It costs about $' + uber_min);
    }


    console.log(uberPrices);

  }

  function destinationResults(results, status) {
    if (status === google.maps.GeocoderStatus.OK && results.length > 0) {

      destLat = results[0].geometry.location.lat();
      destLong = results[0].geometry.location.lng();

      comparePrices();
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