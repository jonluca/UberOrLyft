# yelp-api-v3

yelp-api-v3 is a node module for accessing yelp's v3 API.
  - Inspired by https://github.com/olalonde/node-yelp and https://github.com/elbuo8/4square

## Installation
```javascript
npm install --save yelp-api-v3
```

## Usage
View [yelp's guide](https://github.com/Yelp/yelp-api-v3/blob/master/docs/tutorials/get-start-yelp-api-v3.md) for how to obtain an app id and app secret

```javascript
var Yelp = require('yelp-api-v3');

var yelp = new Yelp({
  app_id: '************',
  app_secret: '************'
});

// https://github.com/Yelp/yelp-api-v3/blob/master/docs/api-references/businesses-search.md
yelp.search({term: 'food', location: '90210', price: '1,2,3', limit: 10})
.then(function (data) {
    console.log(data);
})
.catch(function (err) {
    console.error(err);
});

// https://github.com/Yelp/yelp-api-v3/blob/master/docs/api-references/businesses-search-phone.md
yelp.phoneSearch({phone: '+14159083801'})
.then(function (data) { console.log(data); })
.catch(function (err) { console.error(err);});

// https://github.com/Yelp/yelp-api-v3/blob/master/docs/api-references/transactions-search.md
yelp.transactionSearch('delivery', {location: 'Boston'})
.then(function (data) { console.log(data); })
.catch(function (err) { console.error(err);});

// https://github.com/Yelp/yelp-api-v3/blob/master/docs/api-references/businesses-id.md
yelp.business('yuko-kitchen-los-angeles')
.then(function (data) { console.log(data); })
.catch(function (err) { console.error(err);});

// https://github.com/Yelp/yelp-api-v3/blob/master/docs/api-references/businesses-id-reviews.md
yelp.reviews('yuko-kitchen-los-angeles')
.then(function (data) { console.log(data); })
.catch(function (err) { console.error(err);});

// https://github.com/Yelp/yelp-api-v3/blob/master/docs/api-references/autocomplete.md
yelp.autocomplete({text: 'Pizz', latitude: 40.71,longitude: 74.00}, callback)
.then(function (data) { console.log(data); })
.catch(function (err) { console.error(err);});

// callbacks
yelp.search({term: 'food', location: '90210', limit: 10}, function(err, data) {
    if (err) {
        return console.log(error);
    }
    console.log(data);
});
```
For additional information on parameter and response body data, check you the [yelp v3 documentation](https://github.com/Yelp/yelp-api-v3).

## License
MIT License

Copyright (c) 2016 Kristen Kehlenbeck

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
