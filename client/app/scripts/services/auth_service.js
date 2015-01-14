'use strict';

angular.module('clientApp')
  .factory('Auth', ['$rootScope', '$http', '$cookieStore', '$location', function($rootScope, $http, $cookieStore, $location) {

  var accessToken;

  return {
    init: function() {
      var self = this;

      $rootScope.$on('$routeChangeStart', function(event, next, current) {
        
        // check if we are signed in
        if(!self.isSignedIn()) {

          // TODO: move this to a separate URL
          // redirect case: extract access token from hash
          if($location.hash() !== '') {
            
            var hash = $location.hash();
            var hashExploded = hash.split('=');

            accessToken = hashExploded[1];

            // finished auth, manually clean url and redir to index
            // $location.hash(null);
            $location.url('');
          
          // redirect to instagram website
          } else {
            self.signIn();
          }
        }
      });
    },

    isSignedIn: function() {
      console.log('accessToken', accessToken);

      return accessToken !== undefined;
    },

    signIn: function() {
      var redirectUrl = 'http://localhost:9000/';

      var authorizationUrl = 'https://instagram.com/oauth/authorize/';
      authorizationUrl += '?client_id=0ed0e250ea854a129e9a849a8ee0ed9c';
      authorizationUrl += '&response_type=token';
      authorizationUrl += '&redirect_uri=' + redirectUrl;
      authorizationUrl += '&scope=relationships';

      window.location.href = authorizationUrl;
    }
  };

}]);