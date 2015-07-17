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

            $cookies.put(authCookieKey, searchObject.code);

            $location.search('code', null);

          } else {

            window.location.href = "http://localhost:4567/oauth/connect";

          }
        }

      });
    },

    isSignedIn: function() {
      return $cookies.get(authCookieKey) !== undefined;
    },

    logout: function() {
      $http.post('http://localhost:4567/oauth/disconnect');
    }
  };

}]);