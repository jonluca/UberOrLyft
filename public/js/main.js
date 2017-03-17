$(document).ready(function() {

  function initialize() {

    var input = document.getElementById('searchTextField');
    var autocomplete = new google.maps.places.Autocomplete(input);
  }

  google.maps.event.addDomListener(window, 'load', initialize);

  $('#search').click(function() {});


});