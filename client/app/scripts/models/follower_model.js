'use strict';

angular.module('clientApp').factory('FollowerModel', function($q, $http, Model) {

  var users;

  //
  // constructor
  //

  function FollowerModel() {
    Model.call(this);
  }

  //
  // inheritence
  //

  FollowerModel.prototype = Object.create(Model.prototype);
  FollowerModel.prototype.constructor = FollowerModel;

  //
  // public
  //

  FollowerModel.prototype.get = function(userId) {
    var self = this,
      deferred = $q.defer(),
      url = "http://localhost:4567/users/" + userId + '/followed_by';

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

  return new FollowerModel();
});
