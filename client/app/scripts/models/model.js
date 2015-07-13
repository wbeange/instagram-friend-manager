'use strict';

angular.module('clientApp').factory('Model', function($q, $http) {

  //
  // constructor
  //

  function Model() {
    this.users = [];
  }

  //
  // public
  //

  Model.prototype.all = function(userId, url) {
    this.url = url;

    return this._recursiveAll();
  }

  Model.prototype.get = function() {
    var self = this,
      deferred = $q.defer(),
      url = "http://localhost:4567/users/" + userId;

    $http.get(url).then(function(results) {
      deferred.resolve(results.data);
    });

    return deferred.promise;
  }

  return Model;
});
