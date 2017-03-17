var express = require('express');
var bodyParser = require("body-parser");
var path = require('path');

var lyft = require('lyft-node');
var Uber = require('node-uber');

const uber = new Uber({
  client_id: 'Ra6o6ImnIjtVraXGU5cWKWZvY9wBxlhQ',
  client_secret: 'kFD6Sv9wNR-XehVuGz-d-J3qKrqdtqrLFNiCcwu9',
  server_token: 'Owidg1RtQXyjl8PVxIMYbGLbr2RO3vXXNVw36qwQ',
  redirect_uri: 'http://localhost:3000',
  name: 'PRICECHECK',
  language: 'en_US' // optional, defaults to en_US
});

const lyft = new Lyft('eg8N7BX5mD3B', 'blo3KyrXVCKAMO5dZtQpzLteo-UwAYvW');


var app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, 'public')));


app.get("/", function(req, res) {
  res.render("landing.ejs");
});

app.post("/search", function(req, res) {
  // get start/end locations
  var startLatitude = req.body.startLatitude;
  var startLongitude = req.body.startLongitude;
  var endLatitude = req.body.endLatitude;
  var endLongitude = req.body.endLongitude;


  var results = {};
  var searches = [];

  var uberSearch = uber.estimates.getPriceForRouteAsync(startLatitude, startLongitude, endLatitude, endLongitude);

  var query = {
    start: {
      latitude: startLatitude,
      longitude: startLongitude,
    },
    end: {
      latitude: endLatitude,
      longitude: endLongitude,
    },
    rideType: 'lyft',
  };

  var lyftSearch = lyft.getRideEstimates(query)


  searches.push(uberSearch);
  searches.push(lyftSearch);

  Promise.all(searches).then(function(data) {
    results.uber = SON.parse(data[0]);
    results.lyft = SON.parse(data[1]);
    res.send({
      results: results,
    });
    res.end();

  }
  );

});


app.listen(3000, function() {
  console.log("Listening on port 3000");
});