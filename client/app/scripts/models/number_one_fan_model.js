'use strict';

angular.module('clientApp').factory('NumberOneFanModel', function($q, $http, Configuration) {

  //
  // constructor
  //

  function NumberOneFanModel() {

  }

  //
  // public
  //

  NumberOneFanModel.prototype.get = function() {
    var self = this,
      deferred = $q.defer(),
      url = Configuration.base_api_url + "/number_one_fan";


    $http.get(url).then(function(results) {
      deferred.resolve(results.data);
    });

    return deferred.promise;
  }

  return new NumberOneFanModel();
});
