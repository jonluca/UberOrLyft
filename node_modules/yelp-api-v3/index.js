"use strict";

var request = require('request');

const baseUrl = 'https://api.yelp.com/v3/';

class Yelpv3 {

  constructor(opts) {
    this.appId = opts.app_id;
    this.appSecret = opts.app_secret;
    this.accessToken;
  }

  getAccessToken(cb) {
    const promise = new Promise((resolve, reject) => {
      request.post({
        url: 'https://api.yelp.com/oauth2/token',
        form: {
          client_id: this.appId,
          client_secret: this.appSecret,
          grant_type: 'client_credentials'
        }
      }, (err, response, data) => {
        if (!err && response.statusCode == 200) {
          this.accessToken = JSON.parse(data).access_token;
          resolve(data);
        }
        reject(err);
      });
    });

    if (typeof cb === 'function') {
      promise
        .then((res) => cb(null, res))
        .catch(cb);
      return null;
    }

    return promise;
  }

  get(resource, params, callback) {
    params = (typeof params === 'undefined') ? {} : params;

    const promise = new Promise((resolve, reject) => {
      if (this.accessToken) {
        request.get({
          url: baseUrl + resource + jsonToQueryString(params),
          headers: {
            'Authorization': 'Bearer ' + this.accessToken
          }
        }, (err, response, data) => {
          if (!err && response.statusCode == 200) {
            resolve(data);
          }
        });
      } else {
        this.getAccessToken().then((data) => {
          request.get({
            url: baseUrl + resource + jsonToQueryString(params),
            headers: {
              'Authorization': 'Bearer ' + this.accessToken
            }
          }, (err, response, data) => {
            if (!err && response.statusCode == 200) {
              resolve(data);
            }
            reject(err);
          });
        }).catch((err) => {
          reject(err);
        });
      }
    });

    if (typeof callback === 'function') {
      promise
        .then((res) => callback(null, res))
        .catch((err) => callback(err));
      return null;
    }

    return promise;
  }

  search(params, callback) {
    return this.get('businesses/search', params, callback);
  }

  phoneSearch(params, callback) {
    return this.get('businesses/search/phone', params, callback);
  }

  transactionSearch(transactionType, params, callback) {
    return this.get(`transactions/${transactionType}/search`, params, callback);
  }

  business(id, callback) {
    return this.get(`business/${id}`, undefined, callback);
  }

  reviews(id, callback) {
    return this.get(`business/${id}/reviews`, undefined, callback);
  }

  autocomplete(params, callback) {
    return this.get('autocomplete', params, callback);
  }

}

function jsonToQueryString(json) {
  return '?' +
    Object.keys(json).map(function(key) {
      if (key !== "price") {
        return encodeURIComponent(key) + '=' +
          encodeURIComponent(json[key]);
      } else {
        return key + "=" + json[key];
      }
    }).join('&');
}

module.exports = Yelpv3;
