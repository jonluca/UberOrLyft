uber-api
====

NodeJS implementation of Uber API.
The latest update has promise pattern implemented.

## Installation
```
npm install uber-api
```

## Usage
```javascript
var Uber = require('uber-api')({server_token:'YOUR SERVER TOKEN',version:'v1'}),
    lat = 36,
    lon = -94;

Uber.getProducts(lat, lon, function(error, response) {
  if (error) {
    console.log(error);
  } else {
    console.log(response);
  }
});

Uber.getProducts(lat, lon).then(function(response){
  console.log(response);
}, function(error){
  console.error(response);
});
```

## API Reference
```
getProducts(latitude, longitude[, callback])
getPriceEstimate(start_latitude, start_longitude, end_latitude, end_longitude[, callback])
getTimeEstimate(start_latitude, start_longitude [,customer_uuid] [,product_id][, callback])
getPromotions(start_latitude, start_longitued, end_latitude, end_longitued [, callback])
+getMe([callback])
+†getHistory([callback])
```

+These require special tokens you can get via OAuth2.  You can then initialize Uber with {bearer_token:'YOUR BEARER TOKEN',version:'v1'}.

† This functionality inspects the version passed in and if it is "v1" will auto adjust to "v1.1".  As per the Uber documentation (https://developer.uber.com/v1/endpoints/#user-activity-v1) v1 requires special permission to use. This library currently assumes this permission is not in place.

Rate limit state is returned as a member of the response object.
```
Uber.getProducts(lat, lon).then(function(response){
  console.log(response.rate_limit);
});
```
