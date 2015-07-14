'use strict';

angular.module('clientApp').factory('Model', function($q, $http) {

  //
  // constructor
  //

  function Model() {

  }

  //
  // public
  //

  Model.prototype.get = function(url) {
    var self = this,
      deferred = $q.defer();

    $http.get(url).then(
      // success
      function(results) {
        deferred.resolve(results.data);
      },

      // error
      function(data) {
        deferred.reject(data);
      }
    );

    return deferred.promise;
  }

  return Model;
});
