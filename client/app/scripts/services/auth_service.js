'use strict';

angular.module('clientApp').factory('Auth', ['$rootScope', '$http', '$cookies', '$location', '$q', 'Configuration', 'UserModel',
  function($rootScope, $http, $cookies, $location, $q, Configuration, UserModel) {

  var authCookieKey = 'insta-friend-mngr';

  return {
    init: function() {
      var self = this;

      this.authenticate();

      $rootScope.$on('$routeChangeStart', function(event, next, current) {
        // authenticated
        if(self.isSignedIn()) {

          // redirect if headed to login page
          if($location.path() == '/login') {
            $location.url('/followers');
          }

        // not authenticated
        } else {
          $location.url('/login');
        }
      });
    },

    authenticate: function() {
      var self = this, deferred = $q.defer();

      // ping server for user data -
      // if the server is authenticated we will get user data back to start a client session
      // else the http interceptor will handle 401 and redirect to the login page
      UserModel.get().then(
        // success
        function(data) {
          // console.log('active server session', data);

          // store client session
          $cookies.put(authCookieKey, data);

          $rootScope.$broadcast('wb-authenticated', true);

          // redirect if headed to login page
          if($location.path() == '/login') {
            $location.url('/followers');
          }

          deferred.resolve(data);
        },

        // failure
        function() {
          deferred.reject();
        });

      return deferred.promise;
    },

    isSignedIn: function() {
      return $cookies.get(authCookieKey) !== undefined;
    },

    userId: function() {
      var user = $cookies.get(authCookieKey);

      if(user) {
        return user.id;
      }
    },

    signIn: function() {
      // redirect to authenticate with Instagram
      window.location.href = Configuration.base_api_url + "/oauth/connect";
    },

    // TODO: better naming for these methods...

    // end the client session
    signOut: function() {
      $cookies.put(authCookieKey, undefined);
    },

    // end the server and client session
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
