'use strict';

angular.module('clientApp').factory('Configuration', function() {

  return {
    // base_api_url: 'http://localhost:4567'
    base_api_url: 'https://ruby-api-insta-friend-manager.herokuapp.com',

    base_client_url: 'http://localhost:9001'
  };

});
