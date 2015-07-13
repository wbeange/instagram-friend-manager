'use strict';

angular.module('clientApp').factory('Auth', ['$rootScope', '$http', '$cookieStore', '$location', '$q', function($rootScope, $http, $cookieStore, $location, $q) {

  var accessTokenCookieKey = 'intsa-friend-mngr-token';

  var accessToken;
  var user;

  var redirectUrl = 'http://0.0.0.0:9001/';
  // var redirectUrl = 'https://insta-friend-manager.firebaseapp.com';

  accessToken = $cookieStore.get(accessTokenCookieKey);

  return {
    init: function() {
      var self = this;

      $rootScope.$on('$routeChangeStart', function(event, next, current) {

        // check if we are signed in
        if(!self.isSignedIn()) {

          console.log('authenticated!');

          // extract access token from hash
          // var hash = $location.hash();
          // var hashExploded = hash.split('=');
          // accessToken = hashExploded[1];

          // $cookieStore.put(accessTokenCookieKey, accessToken);

          // $rootScope.$broadcast('authenticated');
          // $location.url('');

        } else {
          // window.location.href = 'http://localhost:4567/oauth/connect';
        }
      });
    },

    isSignedIn: function() {
      return true;
    },

    authenticate: function() {
      // var authorizationUrl = 'https://instagram.com/oauth/authorize/';
      // authorizationUrl += '?client_id=0ed0e250ea854a129e9a849a8ee0ed9c';
      // authorizationUrl += '&response_type=token';
      // authorizationUrl += '&redirect_uri=' + redirectUrl;
      // authorizationUrl += '&scope=relationships';
      // window.location.href = authorizationUrl;

      console.log('redir');


    },

    accessToken: function() {
      return accessToken;
    },

    logout: function() {
      accessToken = undefined;
      $cookieStore.remove(accessTokenCookieKey);
      window.location.href = redirectUrl;
    }
  };

}]);