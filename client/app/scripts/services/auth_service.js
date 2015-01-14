'use strict';

angular.module('clientApp')
  .factory('Auth', ['$rootScope', '$http', '$cookieStore', '$location', function($rootScope, $http, $cookieStore, $location) {

  var accessToken;

  return {
    init: function() {
      var self = this;

      $rootScope.$on('$routeChangeStart', function(event, next, current) {
        
        if(!self.isSignedIn()) {
          self.signIn();
        }
      });
    },

    isSignedIn: function() {
      return accessToken !== undefined;
    },

    signIn: function() {
      var redirectUrl = 'http://localhost/';

      var authorization_url = 'https://instagram.com/oauth/authorize/';
      authorization_url += '?client_id=0ed0e250ea854a129e9a849a8ee0ed9c';
      authorization_url += '&response_type=token';
      authorization_url += '&redirect_uri=' + redirectUrl;
      authorization_url += '&scope=relationships';

      window.location.href = authorization_url;
    }
  };

}]);