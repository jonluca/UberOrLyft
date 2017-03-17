var endpoint = {};

endpoint.product_types = '/products';
endpoint.price_estimates = '/estimates/price';
endpoint.time_estimates = '/estimates/time';
endpoint.promotions = '/promotions';
endpoint.user_activity = '/history';
endpoint.user_profile = '/me';
endpoint.request = '/requests';
endpoint.request_map = function(request_id){
  return endpoint.request  + '/' + request_id + '/map';
};

module.exports = endpoint;