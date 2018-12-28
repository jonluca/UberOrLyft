'use es6';

const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');
const config = require('./config');

const Lyft = require('lyft-node');

const Uber = require('node-uber');

const uber = new Uber({
  client_id: config.client_id,
  client_secret: config.client_secret,
  server_token: config.server_token,
  redirect_uri: 'http://localhost:3000',
  name: 'PRICECHECjK',
  language: 'en_US' // optional, defaults to en_US
});

const lyft = new Lyft(config.lyft_one, config.lyft_two);

const app = express();
const helmet = require('helmet');
app.use(helmet({xssFilter: false}));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.set("view engine", "ejs");

app.use('/', express.static(path.join(__dirname, 'public')));

app.get("/", function (req, res) {
  res.render("landing.ejs");
});

app.post("/search", function (req, res) {
  // get start/end locations
  const startLatitude = (req.body.startLatitude);
  const startLongitude = (req.body.startLongitude);
  const endLatitude = (req.body.endLatitude);
  const endLongitude = (req.body.endLongitude);

  const results = {};
  const searches = [];

  const uberSearch = uber.estimates.getPriceForRouteAsync(startLatitude, startLongitude, endLatitude, endLongitude);

  const regularLyft = {
    start: {
      latitude: startLatitude,
      longitude: startLongitude
    },
    end: {
      latitude: endLatitude,
      longitude: endLongitude
    },
    rideType: 'lyft'
  };

  const lyft_line = {
    start: {
      latitude: startLatitude,
      longitude: startLongitude
    },
    end: {
      latitude: endLatitude,
      longitude: endLongitude
    },
    rideType: 'lyft_line'
  };

  const lyft_plus = {
    start: {
      latitude: startLatitude,
      longitude: startLongitude
    },
    end: {
      latitude: endLatitude,
      longitude: endLongitude
    },
    rideType: 'lyft_plus'
  };

  const lyftSearch = lyft.getRideEstimates(regularLyft);
  const lyft_lineSearch = lyft.getRideEstimates(lyft_line);
  const lyft_plusSearch = lyft.getRideEstimates(lyft_plus);

  searches.push(uberSearch);
  searches.push(lyftSearch);
  searches.push(lyft_lineSearch);
  searches.push(lyft_plusSearch);

  Promise.all(searches).then(function (data) {

    results.uber = data[0]["prices"];
    results.lyft = data[1]["cost_estimates"];
    results.lyft_line = data[2]["cost_estimates"];
    results.lyft_plus = data[3]["cost_estimates"];

    res.send({
      results: results
    });
    res.end();

  }).catch(function () {
    console.log('failed promise?');
  });

});

app.listen(8082, function () {
  console.log("Listening on port 8082");
});