'use strict';

angular.module('clientApp').factory('Auth', ['$rootScope', '$http', '$cookies', '$location', 'Configuration', function($rootScope, $http, $cookies, $location, Configuration) {

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

            $rootScope.$broadcast('wb-authenticated', true);

            // redirect to page once logged in
            $location.url('/followers');

          } else {

            // redirect to the client login page
            $location.url('/login');
          }
        }
      });
    },

    isSignedIn: function() {
      return $cookies.get(authCookieKey) !== undefined;
    },

    signIn: function() {
      // redirect to authenticate with Instagram
      window.location.href = Configuration.base_api_url + "/oauth/connect";
    },

    // TODO: better naming for these methods...

    signOut: function() {
      $cookies.put(authCookieKey, undefined);
    },

    logout: function() {
      // delete the server cookie
      $http.post(Configuration.base_api_url + '/oauth/disconnect');

      // delete the client cookie
      this.signOut();

      // pub auth state
      $rootScope.$broadcast('wb-authenticated', false);

      // redirect to the client login page
      $location.url('/login');
    }
  };

}]);
