'use strict';

angular.module('clientApp').factory('FollowerModel', function($q, $http) {

  var users;

  //
  // constructor
  //

  function FollowerModel() {

  }

  //
  // public
  //

  FollowerModel.prototype.all = function(userId) {
    if(userId === undefined) {
      userId = 'self';
    }

    var self = this,
      deferred = $q.defer(),
      url = "http://localhost:4567/users/" + userId + '/follows';

    $http.get(url).then(function(results) {
      deferred.resolve(results.data);
    });

    return deferred.promise;
  }

  return new FollowerModel();
});
