/*jslint node: true */
'use strict';

var _        = require('underscore');
var config   = require('./uberConfig');
var helper   = require('./uberHelper');
var endpoint = require('./uberEndpoints');

/**
 *
 * Constructor, takes in your Uber API Server token and version.  Currently for most request, this is 'v1'.  
 * However, for some user history request, this is 'v1.1'.
 * This assumes if data is of type string, it is a server_token.
 * 
 * @param object required
 *  - server_token | bearer_token
 *  - version
 *
 * @throws Error if token is not supplied
 */
function Uber(data) {
  var api_version,
      server_token,
      bearer_token,
      use_sandbox;
  
  if (!(this instanceof Uber)) {
    return new Uber(data);
  }
  if (_.isUndefined(data)) {
    throw new Error("Server token or data object is required.");
  }

  if (_.isString(data)) {
    server_token = data;
    api_version = config.version; 
  } else { // assume object
    if (_.isUndefined(data.server_token)) {
      if (_.isUndefined(data.bearer_token)) {
        throw new Error("An API token is required.");
      } else {
        bearer_token = data.bearer_token;
      }
    } else {
      server_token = data.server_token;
    } 
    api_version = ((_.isUndefined(data.version)) ? config.version : data.version);

    var  baseUrl = config.baseUrl + api_version;
  }
  
  /**
   *
   * getProducts
   *
   * @param Number required Lat component of location.
   * @param Number required Lng component of location.
   * @param Function A callback function which takes two parameters
   *
   * @throws Error If the latitude or longitude are not supplied
   */
  function getProducts(params, callback) {
    helper.checkLocationParams(params);

    var url = baseUrl + endpoint.product_types + 
      "?latitude=" + params.lat + "&longitude=" + params.lng;
    
    return helper.get(this.getAuthToken(), url, callback);
  }
  
  
  /**
   *
   * getPriceEstimate Requires both a starting and ending point
   *
   * @param Number required Latitude component of start location.
   * @param Number required Longitude component of start location.
   * @param Number required Latitude component of end location.
   * @param Number required Longitude component of end location.
   * @param Function A callback function which takes two parameters
   *start_latitude, start_longitude, end_latitude, end_longitude
   * @throws Error If the starting or ending latitude or longitude are not supplied
   */
  function getPriceEstimate(params, callback) {
    helper.checkStartLocParams(params);
    helper.checkEndLocParams(params);
    var url = baseUrl + endpoint.price_estimates;
    url += "?start_latitude=" + params.sLat + "&start_longitude=" + params.sLng;
    url += "&end_latitude=" + params.eLat + "&end_longitude=" + params.eLng;

    return helper.get(this.getAuthToken(), url, callback);
  }
  
  /**
   *
   * getTimeEstimate Requires starting point, gives an estimate (in seconds) of time until arrival
   *
   * @param Number required Lat component.
   * @param Number required Lng component.
   * @param String Unique customer identifier to be used for experience customization.
   * @param String Unique identifier representing a specific product for a given latitude & longitude.
   * @param Function A callback function which takes two parameters

   * @throws Error If the starting or ending latitude or longitude are not supplied
   */
  function getTimeEstimate(params, callback) {
    helper.checkStartLocParams(params);

    if (_.isFunction(params.customer_uuid)) {
      callback = params.customer_uuid;
    }
    if (_.isFunction(params.product_id)) {
      callback = params.product_id;
    }

    var u = baseUrl + endpoint.time_estimates + "?start_latitude=" + params.sLat + "&start_longitude=" + params.sLng;
    if (!_.isUndefined(params.customer_uuid) && !_.isFunction(params.customer_uuid)) {
      u += "&customer_uuid=" + params.customer_uuid;
    }
    if (!_.isUndefined(params.product_id) && !_.isFunction(params.product_id)) {
      u += "&product_id=" + params.product_id;
    }
    return helper.get(this.getAuthToken(), u, callback);
  }
  
  /**
   *
   * getPromotions At least one valid set of coordinates is required.
   * 
   * @param Number required Start Latitude component
   * @param Number required Start Longitude component
   * @param Number required End Latitude component
   * @param Number required End Longitude component
   * @param Function A callback function which takes two parameters
   */
  function getPromotions(params, callback) {
    helper.checkStartLocParams(params);
    helper.checkEndLocParams(params);

    var u = baseUrl + "/promotions?start_latitude=" + params.sLat + "&start_longitude=" + params.sLng;
    u += "&end_latitude=" + params.eLat + "&end_longitude=" + params.eLng;
    return helper.get(this.getAuthToken(), u, callback);
  }
  
  /**
   * getHistory Get the currently logged in user history
   *
   * @param Function A callback function which takes two paramenters
   */
  function getHistory(callback) {
    if (_.isUndefined(callback)) {
    } else {
      var u = config.baseUrl + ((api_version == "v1") ? "v1.1" : api_version) + "/history",
          tokenData = this.getAuthToken();
      if (tokenData.type != "bearer") {
        throw new Error("Invalid token type. Must use a token of type bearer.");
      }
      return helper.get(tokenData, u, callback);
    }
  }
  
  /**
   * getMe Get the currently logged in user profile.
   *
   * @param Function A callback function which takes two parameters
   */
  function getUserProfile(callback) {
    if (_.isUndefined(callback)) {
    } else {
      var u = baseUrl + "/me";
      var tokenData = this.getAuthToken();
      if (tokenData.type != "bearer") {
        throw new Error("Invalid token type. Must use a token of type bearer.");
      }
      return helper.get(tokenData, u, callback);
    }
  }
  
  /**
   *
   */
  function getAuthToken() {
    var data = {
      token: server_token,
      type: "server"
    };
    if (!_.isUndefined(bearer_token)) {
      data.token = bearer_token;
      data.type = "bearer";
    }
    return data;
  }
  

  function makeRequest(params, callback){
    if(_.isUndefined(params.product_id))
      throw new Error('product_id must be defined');
    helper.checkStartLocParams(params);
    helper.checkEndLocParams(params);

    // TODO
  }

  function getRequestDetails(request_id, callback) {
    if(_.isUndefined(request_id))
      throw new Error('Must pass a request_id');
    // TODO
  }

  function cancelRequest(request_id, callback) {
    if(_.isUndefined(request_id))
      throw new Error('Must pass a request_id');
    // TODO
  }

  function getRequestMap(request_id, callback) {
    if(_.isUndefined(request_id))
      throw new Error('Must pass a request_id');    
    // TODO
  }

  return {
    getProducts: getProducts,
    getPriceEstimate: getPriceEstimate,
    getTimeEstimate: getTimeEstimate,
    getPromotions: getPromotions,
    getHistory: getHistory,
    getUserProfile: getUserProfile,
    getAuthToken: getAuthToken,
    makeRequest : makeRequest,
    getRequestDetails : getRequestDetails,
    cancelRequest : cancelRequest,
    getRequestMap : getRequestMap,
    api_version: api_version,
    server_token: server_token,
    bearer_token: bearer_token
  };
}

module.exports = Uber;

