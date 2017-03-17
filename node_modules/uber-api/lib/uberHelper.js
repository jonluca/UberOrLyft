/*jslint node: true */
'use strict';

var Promise = require("promise");
var request = require("request");
var _ = require('underscore');

var helper = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

helper.get = function (tokenData, url, callback) {
  var tokenStr = "Token ";
  
  if (tokenData.type == "bearer") {
    tokenStr = "Bearer ";
  }
  
  var opts = {
    url: url,
    headers: {
      "Authorization": tokenStr + tokenData.token
    }
  };
  
  return new Promise(function(fulfill, reject){
    request.get(opts, function(error, body, response) {
      if (error) {
        reject(JSON.parse(error));
        if (typeof callback !== 'undefined')
          callback(JSON.parse(error), null);
      } else {
        if (body.statusCode != 200) {
          reject(JSON.parse(response));
          if (typeof callback !== 'undefined')
            callback(JSON.parse(response), null);
        } else {
          var res = JSON.parse(response);

          // Examine rate limit headers
          var rateLimit = body.headers["x-rate-limit-limit"];
          var rateRemaining = body.headers["x-rate-limit-remaining"];
          var rateReset = body.headers["x-rate-limit-reset"];
          if(typeof rateLimit !== 'undefined' && 
            typeof rateRemaining !== 'undefined' && 
            typeof rateReset !== 'undefined'){
            // Add rate limit to response object
            res.rate_limit = {
              "limit" : rateLimit,
              "remaining" : rateRemaining,
              "reset" : new Date(rateReset * 1000)
            };
          }

          fulfill(res);
          if (typeof callback !== 'undefined')
            callback(null, res);
        }
      }
    });
  });
};

helper.checkLocationParams = function(params){
	if(_.isUndefined(params) || _.isNull(params)) {
      throw new Error('params object must be defined');
    }
    if (_.isUndefined(params.lat) || _.isFunction(params.lat) || _.isNull(params.lat)) {
      throw new Error("lat must be defined");
    }
    if (_.isUndefined(params.lng) || _.isFunction(params.lng) || _.isNull(params.lng)) {
      throw new Error("lng must be defined");
    }
  };

helper.checkStartLocParams = function(params) { 
	if(_.isUndefined(params) || _.isNull(params)) {
      throw new Error('params object must be defined');
    }
    if (_.isUndefined(params.sLat) || _.isFunction(params.sLat) || _.isNull(params.sLat)) {
      throw new Error("sLat must be defined");
    }
    if (_.isUndefined(params.sLng) || _.isFunction(params.sLng) || _.isNull(params.sLng)) {
      throw new Error("sLat must be defined");
    }
  };

helper.checkEndLocParams = function(params) {    
	if(_.isUndefined(params) || _.isNull(params)) {
      throw new Error('params object must be defined');
    } 
    if (_.isUndefined(params.eLat) || _.isFunction(params.eLat) || _.isNull(params.eLat)) {
      throw new Error("eLat must be defined");
    }
    if (_.isUndefined(params.eLng) || _.isFunction(params.eLng) || _.isNull(params.eLng)) {
      throw new Error("eLat must be defined");
    }
  };


 module.exports = helper;