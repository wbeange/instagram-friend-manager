'use strict';

angular.module('clientApp').factory('Configuration', function() {

  return {
    // TODO: handle dev / production variables in grunt
    // baseApiUrl: 'http://localhost:4567',
    baseApiUrl: 'https://api-instagram-friend-manager.herokuapp.com',

    // baseClientUrl: 'http://localhost:9001',
    baseClientUrl: 'https://insta-friend-manager.firebaseapp.com',

    clientSessionKey: 'insta-friend-mngr'
  };

});
