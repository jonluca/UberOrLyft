var assert = require("assert"),
    should = require("chai").should(),
    config = require("../demo/config"),
    uber = require("../uber")( { server_token: config.token, version: 'v1'}),
    sLat = 36.3018,
    sLon = -94.1215,
    eLat = 36.0,
    eLon = -94.0;
    

describe("uber-api", function() {  
  describe(".getProducts", function() {
    it("Should return a list of available products based on location (latitude and longitude).", function(done) {
      uber.getProducts({ lat : sLat, lng : sLon}, function(error, response) {
        try {
          should.not.exist(error);
          should.exist(response);
          response.should.be.an('object');
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  }); 
  describe(".getPriceEstimate", function() {
    it("Should return a JSON object of an array of price estimates based on starting and ending points.", function(done) {
      uber.getPriceEstimate({sLat: sLat, sLng: sLon, eLat: eLat, eLng: eLon}, function(error, response) {
        try {
          should.not.exist(error);
          should.exist(response);
          response.should.be.an('object');
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
  describe(".getTimeEstimate", function() {
    it("Should return a JSON object of an array of time estimates based on starting point.", function(done) {
      uber.getTimeEstimate({sLat: sLat, sLng: sLon }, function(error, response) {
        try {
          should.not.exist(error);
          should.exist(response);
          response.should.be.an('object');
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
  describe(".getPromotions", function() {
    it("Should return a JSON object of an array of promotions available to a new user based on location.", function(done) {
      uber.getPromotions({sLat: sLat, sLng: sLon, eLat: eLat, eLng: eLon}, function(error, response) {
        try {
          should.not.exist(error);
          should.exist(response);
          response.should.be.an('object');
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});