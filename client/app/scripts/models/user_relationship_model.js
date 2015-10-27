'use strict';

angular.module('clientApp').factory('UserRelationshipModel', function($q, $http, Configuration) {

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
    var self = this,
      deferred = $q.defer(),
      url = Configuration.baseApiUrl + "/users/" + userId + "/relationship";

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
