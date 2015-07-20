'use strict';

angular.module('clientApp').factory('HttpInterceptor', ['$q', '$injector', function($q, $injector) {

  return {
    responseError: function(rejection) {
      var config = $injector.get('Configuration');
      var auth = $injector.get('Auth');

      // if server isn't authenticated remove the isAuthenticated flag and try again
      if(rejection.status == 401) {
        // remove stale client cookie
        auth.signOut();

        // redirect to authenticate with Instagram
        window.location.href = config.base_api_url + "/oauth/connect";
      }

      return $q.reject(rejection);
    }
  };

}]);
