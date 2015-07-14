'use strict';

angular.module('clientApp').factory('FollowingModel', function($q, $http, Model) {

  var users;

  //
  // constructor
  //

  function FollowingModel() {
    Model.call(this);
  }

  //
  // inheritence
  //

  FollowingModel.prototype = Object.create(Model.prototype);
  FollowingModel.prototype.constructor = FollowingModel;

  //
  // public
  //

  FollowingModel.prototype.get = function(userId) {
    var self = this,
      deferred = $q.defer(),
      url = "http://localhost:4567/users/" + userId + '/follows';

    // suppress call if users stored locally after first load
    if(users) {
      deferred.resolve(users);
    } else {
      Model.prototype.get.call(this, url).then(function(data) {

        // store locally so you only load once
        users = data;

        deferred.resolve(data);
      });
    }

    return deferred.promise;
  }

  return new FollowingModel();
});
