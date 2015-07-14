'use strict';

angular.module('clientApp').factory('UserModel', function($q, $http) {

  var users = [];

  //
  // constructor
  //

  function UserModel() {

  }

  //
  // public
  //

  UserModel.prototype.get = function(userId) {
    if(userId === undefined) {
      userId = "self";
    }

    var self = this,
      deferred = $q.defer(),
      url = "http://localhost:4567/users/" + userId;

    // store user locally so you only load once #yolo
    if(_.has(users, userId) && users[userId]) {
      deferred.resolve(users[userId]);
    } else {
      $http.get(url).then(function(results) {
        users[userId] = results.data;
        deferred.resolve(results.data);
      });
    }

    return deferred.promise;
  }

  UserModel.prototype.follow = function(userId) {
    var self = this,
      deferred = $q.defer(),
      url = "http://localhost:4567/users/" + userId + "/follow";

    $http.post(url).then(function(result) {
      console.log('follow action return', result);
    });

    return deferred.promise;
  }

  UserModel.prototype.unfollow = function(userId) {
    var self = this,
      deferred = $q.defer(),
      url = "http://localhost:4567/users/" + userId + "/unfollow";

    $http.post(url).then(function(result) {
      console.log('follow action return', result);
    });

    return deferred.promise;
  }

  return new UserModel();
});
