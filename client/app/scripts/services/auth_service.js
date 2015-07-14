'use strict';

angular.module('clientApp').factory('Auth', ['$http', function($http) {

  return {
    init: function() {
      // TODO: authenticate?
    },

    isSignedIn: function() {
      return true;
    },

    logout: function() {
      $http.post('http://localhost:4567/oauth/disconnect');
    }
  };

}]);