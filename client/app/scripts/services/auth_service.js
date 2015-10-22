'use strict';

angular.module('clientApp').factory('Auth', ['$rootScope', '$http', '$cookies', '$location', '$q', 'Configuration', 'UserModel',
  function($rootScope, $http, $cookies, $location, $q, Configuration, UserModel) {

  var authCookieKey = 'insta-friend-mngr';

  return {
    init: function() {
      var self = this;

      // try and start a client session
      this.authenticate().then(function() {
        // redirect from login page if that's where we're headed
        self._routeChangeStartCallback();
      });

      $rootScope.$on('$routeChangeStart', function(event, next, current) {
        self._routeChangeStartCallback()
      });
    },

    _routeChangeStartCallback: function() {
      // authenticated
      if(this.isSignedIn()) {

        // redirect if headed to login page
        if($location.path() == '/login') {
          $location.url('/followers');
        }

      // not authenticated
      } else {
        $location.url('/login');
      }
    },

    _authenticatedCallback: function(data) {
      // console.log('active server session', data);

      // store client session
      $cookies.put(authCookieKey, data.id);

      $rootScope.$broadcast('wb-authenticated', true);
    },

    authenticate: function() {
      var self = this,
        params = $location.search(),
        deferred = $q.defer();

      // start client session if the server passes back the user id
      if(_.has(params, 'self')) {
        var data = {id: params.self};
        this._authenticatedCallback(data);
        deferred.resolve(data);

      } else {

        // ping server for user data -
        // if the server is authenticated we will get user data back to start a client session
        // else the http interceptor will handle 401 and redirect to the login page
        UserModel.get().then(
          // success
          function(data) {
            self._authenticatedCallback(data);
            deferred.resolve(data);
          },

          // failure
          function() {
            deferred.reject();
          });
      }

      return deferred.promise;
    },

    isSignedIn: function() {
      return $cookies.get(authCookieKey) !== undefined;
    },

    userId: function() {
      return $cookies.get(authCookieKey);
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
