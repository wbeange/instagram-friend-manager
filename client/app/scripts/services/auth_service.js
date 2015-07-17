'use strict';

angular.module('clientApp').factory('Auth', ['$rootScope', '$http', '$cookies', '$location', function($rootScope, $http, $cookies, $location) {

  var authCookieKey = 'insta-friend-mngr';

  return {
    init: function() {
      var self = this;

      $rootScope.$on('$routeChangeStart', function(event, next, current) {

        // check if we are authenticated
        if(!self.isSignedIn()) {

          // check if this is the callback after authenticating
          var searchObject = $location.search();

          if(_.has(searchObject, 'code')) {

            // store the session
            $cookies.put(authCookieKey, searchObject.code);

            // If paramValue is null, the property specified via the first argument will be deleted.
            $location.search('code', null);

          } else {

            self.signIn();
          }
        }
      });
    },

    isSignedIn: function() {
      return $cookies.get(authCookieKey) !== undefined;
    },

    signIn: function() {
      // redirect to authenticate with Instagram
      window.location.href = "http://localhost:4567/oauth/connect";
    },

    signOut: function() {
      $cookies.put(authCookieKey, undefined);
    },

    logout: function() {
      // delete the server cookie
      $http.post('http://localhost:4567/oauth/disconnect');

      // redirect to the client index
      window.location.href = "http://localhost:9001/";
    }
  };

}]);
