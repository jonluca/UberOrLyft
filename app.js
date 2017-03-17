var express = require('express');
var bodyParser = require("body-parser");
var path = require('path')


var Uber = require('uber-api')({
  server_token: 'Owidg1RtQXyjl8PVxIMYbGLbr2RO3vXXNVw36qwQ',
  version: 'v1'
})




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
  var results = {};
  var searches = [];

  Uber.getProducts(lat, lon, function(error, response) {
    if (error) {
      console.log(error);
    } else {
      console.log(response);
    }
  });

  Uber.getPriceEstimate(lat, lon)

  searches.push(ratingSearch);

  Promise.all(searches).then(function(data) {
    results.rating = JSON.parse(data[0]).businesses[0];
    results.distance = JSON.parse(data[1]).businesses[0];
    results.price = JSON.parse(data[2]).businesses[0];
    res.send({
      results: results,
    });
    res.end();

  }
  );

});


app.listen(3000, function() {
  console.log("Listening on port 3000!!!");
});