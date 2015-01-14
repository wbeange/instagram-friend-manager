'use strict';

angular.module('clientApp')
  .factory('Auth', ['$rootScope', '$http', '$cookieStore', '$location', '$q', function($rootScope, $http, $cookieStore, $location, $q) {

  var accessToken;
  var user;

  return {
    init: function() {
      var self = this;

      $rootScope.$on('$routeChangeStart', function(event, next, current) {
        
        // check if we are signed in
        if(!self.isSignedIn()) {

          // TODO: move this to a separate URL
          // redirect case
          if($location.hash() !== '') {
            
            // extract access token from hash
            var hash = $location.hash();
            var hashExploded = hash.split('=');
            accessToken = hashExploded[1];
          
          // redirect to instagram website
          } else {
            self.authenticate();
          }
        }
      });
    },

    isSignedIn: function() {
      console.log('Auth.isSignedIn() - accessToken', accessToken);

      return accessToken !== undefined;
    },

    authenticate: function() {
      var redirectUrl = 'http://localhost:9001/';

      var authorizationUrl = 'https://instagram.com/oauth/authorize/';
      authorizationUrl += '?client_id=0ed0e250ea854a129e9a849a8ee0ed9c';
      authorizationUrl += '&response_type=token';
      authorizationUrl += '&redirect_uri=' + redirectUrl;
      authorizationUrl += '&scope=relationships';

      window.location.href = authorizationUrl;
    },    

    accessToken: function() {
      return accessToken;
    }
  };

}]);