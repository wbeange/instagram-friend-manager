'use strict';

angular.module('clientApp').factory('HttpInterceptor', ['$q', '$injector', '$location', function($q, $injector, $location) {
  return {
    responseError: function(rejection) {
      var auth = $injector.get('Auth');

      // if server isn't authenticated kill the stale client session and redirect
      if(rejection.status == 401) {
        auth.signOut();

        $location.url('/login');
      }

      return $q.reject(rejection);
    }
  };
}]);
