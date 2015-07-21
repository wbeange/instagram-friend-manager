'use strict';

angular.module('clientApp').factory('HttpInterceptor', ['$q', '$injector', function($q, $injector, $location) {

  return {
    responseError: function(rejection) {
      var config = $injector.get('Configuration');
      var auth = $injector.get('Auth');

      // if server isn't authenticated remove the isAuthenticated flag and try again
      if(rejection.status == 401) {
        // remove stale client cookie
        auth.signOut();

        // redirect to the client login page
        $location.url('/login');
      }

      return $q.reject(rejection);
    }
  };

}]);
