var express = require('express');
var bodyParser = require("body-parser");
var path = require('path');

var Uber = require('node-uber');
var uber = new Uber({
  client_id: 'Ra6o6ImnIjtVraXGU5cWKWZvY9wBxlhQ',
  client_secret: 'kFD6Sv9wNR-XehVuGz-d-J3qKrqdtqrLFNiCcwu9',
  server_token: 'Owidg1RtQXyjl8PVxIMYbGLbr2RO3vXXNVw36qwQ',
  redirect_uri: 'http://localhost:3000',
  name: 'PRICECHECK',
  language: 'en_US' // optional, defaults to en_US
});


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
  // get data from form and use it to search
  var startLatitude = req.body.startLatitude;
  var startLongitude = req.body.startLongitude;
  var endLatitude = req.body.endLatitude;
  var endLongitude = req.body.endLongitude;
  console.log(startLatitude)
  console.log(startLongitude)
  var results = {};
  var searches = [];

  var uberSearch = uber.estimates.getPriceForRouteAsync(startLatitude, startLongitude, endLatitude, endLongitude);

  searches.push(uberSearch);

  Promise.all(searches).then(function(data) {
    res.send({
      results: data,
    });
    res.end();

  }
  );

});


app.listen(3000, function() {
  console.log("Listening on port 3000");
});