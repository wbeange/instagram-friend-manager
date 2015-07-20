'use strict';

angular.module('clientApp').factory('HttpInterceptor', ['$q', '$injector', function($q, $injector) {

  return {
    responseError: function(rejection) {
      var auth = $injector.get('Auth');

      // if server isn't authenticated remove the isAuthenticated flag and try again
      if(rejection.status == 401) {
        auth.signOut();
        auth.signIn();
      }

      return $q.reject(rejection);
    }
  };

}]);
