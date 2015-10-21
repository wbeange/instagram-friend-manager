'use strict';

angular.module('clientApp').factory('Configuration', function() {

  return {
    // TODO: handle dev / production variables in grunt
    // base_api_url: 'http://localhost:4567',
    base_api_url: 'https://api-instagram-friend-manager.herokuapp.com',
    // base_client_url: 'http://localhost:9001'
    base_client_url: 'https://insta-friend-manager.firebaseapp.com'
  };

});
