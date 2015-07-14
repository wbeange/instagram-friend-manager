'use strict';

angular.module('clientApp').factory('UserRelationshipModel', function($q, $http) {

  var relationship = [];

  //
  // constructor
  //

  function UserRelationshipModel() {

  }

  //
  // public
  //

  UserRelationshipModel.prototype.get = function(userId) {
    if(userId === undefined) {
      userId = "self";
    }

    var self = this,
      deferred = $q.defer(),
      url = "http://localhost:4567/users/" + userId + "/relationship";

    if(_.has(relationship, userId) && relationship[userId]) {
      deferred.resolve(relationship[userId]);
    } else {
      $http.get(url).then(function(results) {
        relationship[userId] = results.data;
        deferred.resolve(results.data);
      });
    }

    return deferred.promise;
  }

  return new UserRelationshipModel();
});
