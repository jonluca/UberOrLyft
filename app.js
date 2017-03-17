var express = require('express');
var Yelp = require('yelp-api-v3');
var bodyParser = require("body-parser");
var path = require('path')


var yelp = new Yelp({
  app_id: "txMAKnMIAeAOHElQpTEyuA",
  app_secret: "4yJqQck1j6FrkAYNjE5TAcv3LRxDGrOX9Bqmv8Zrh0LClppgUFWHEhdK6IymsHdp"
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
  var latitude = req.body.latitude;
  var longitude = req.body.longitude;
  var results = {};
  var searches = [];
  const searchByRating = {
    term: 'restaurant',
    latitude: latitude,
    longitude: longitude,
    radius: 16000,
    limit: 1,
    open_now: true,
    sort_by: 'rating'
  }

  const searchByDistance = {
    term: 'restaurant',
    latitude: latitude,
    longitude: longitude,
    radius: 16000,
    limit: 1,
    open_now: true,
    sort_by: 'distance'
  }

  const searchByPrice = {
    term: 'restaurant',
    latitude: latitude,
    longitude: longitude,
    radius: 16000,
    open_now: true,
    limit: 1,
    sort_by: 'best_match',
    price: '1'
  }


  var ratingSearch = yelp.search(searchByRating);
  var distanceSearch = yelp.search(searchByDistance);
  var priceSearch = yelp.search(searchByPrice);

  searches.push(ratingSearch);
  searches.push(distanceSearch);
  searches.push(priceSearch);

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