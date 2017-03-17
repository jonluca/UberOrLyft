$(document).ready(function() {

  function sendLoc(position) {
    $.ajax({
      method: 'POST',
      url: "/search",
      type: 'json',
      data: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
      success: showRestaurants,
    });
  }

  function showRestaurants(data, code, jqXHR) {

    /*Hide loading icon, title, and button in that order*/
    $('.loading').css('display', 'none');
    $('#title').css('display', 'none');
    $('.searchpage').css('display', 'none');

    var rating = data.results["rating"];
    var distance = data.results["distance"];
    var price = data.results["price"];
    /*Show three columns and new title*/
    $('.choose').css('display', 'block');

    $('.columns').css('display', 'block');


    $('#distanceImage').css("background-image", "url(" + distance["image_url"] + ")");
    $('#ratingImage').css("background-image", "url(" + rating["image_url"] + ")");
    $('#priceImage').css("background-image", "url(" + price["image_url"] + ")");

    $('#goPrice').click(function() {
      var name = price["name"];
      var win = window.open('https://www.google.com/maps?q=' + encodeURIComponent(name), '_blank');
      if (win) {
        //Browser has allowed it to be opened
        win.focus();
      } else {
        //Browser has blocked it
        alert('Please allow popups for this website');
      }
    })

    $('#goRating').click(function() {
      var name = rating["name"];
      var win = window.open('https://www.google.com/maps?q=' + encodeURIComponent(name), '_blank');
      if (win) {
        //Browser has allowed it to be opened
        win.focus();
      } else {
        //Browser has blocked it
        alert('Please allow popups for this website');
      }
    })

    $('#goDistance').click(function() {
      var name = distance["name"];
      var win = window.open('https://www.google.com/maps?q=' + encodeURIComponent(name), '_blank');
      if (win) {
        //Browser has allowed it to be opened
        win.focus();
      } else {
        //Browser has blocked it
        alert('Please allow popups for this website');
      }
    })

    $('#priceRest').text(price["name"])
    $('#distRest').text(distance["name"])
    $('#rateRest').text(rating["name"])

    $('#distPrice').text("Price: " + distance["price"] + '\n' + distance["display_phone"] + '\n' + "Rating: " + distance["rating"] + '\n' + "Distance: " + convertToKM(distance["distance"]))
    $('#ratePrice').text("Price: " + rating["price"] + '\n' + rating["display_phone"] + '\n' + "Rating: " + rating["rating"] + '\n' + "Distance: " + convertToKM(rating["distance"]))
    $('#pricePrice').text("Price: " + price["price"] + '\n' + price["display_phone"] + '\n' + "Rating: " + price["rating"] + '\n' + "Distance: " + convertToKM(price["distance"]))

  }

  function locationFailed(err) {
    console.log(err)
  }

  function convertToKM(meters) {
    var m = parseInt(meters);
    return '' + Math.round(m / 1000) + "km";
  }
  //search button on click
  $('#search').click(function() {
    // add loading bar

    var button = document.getElementById('search');

    $('.loading').css('display', 'block');

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(sendLoc, locationFailed, {
        timeout: 10000,
        maximumAge: 180000
      });
    // $.ajax({
    //   method: 'POST',
    //   url: "/search",
    //   type: 'json',
    //   data: {
    //     latitude: '34.0290238',
    //     longitude: '-118.2721847',
    //   },
    //   success: showRestaurants,
    // });
    } else {
      button.innerHTML = "Geolocation is not supported by this browser.";
    }

  });
});