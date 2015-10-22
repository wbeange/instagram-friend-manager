'use strict';

angular.module('clientApp').factory('UserModel', function($q, $http, $window, Configuration) {

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
      url = Configuration.baseApiUrl + "/users/" + userId;

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

  //
  // http://developers.instagram.com/post/116410697261/publishing-guidelines-and-signed-requests
  // Starting today, any newly created client_id that wishes to issue POST and DELETE requests
  // to the Likes or Relationships API endpoints will first have to request that access.
  // This will follow the same process that we introduced for posting comments last year.
  // Examples of use-cases that will be considered for access include:
  //

  //
  // TODO: I can't implement POST or DELETE at this time
  //

  UserModel.prototype.follow = function(userId) {
    // var self = this,
    //   deferred = $q.defer(),
    //   url = Configuration.baseApiUrl + "/users/follow";

    // $http.post(url, {id: userId}).then(function(result) {
    //   console.log('follow action return', result);
    //   deferred.resolve(result);
    // });

    // return deferred.promise;

    var url = "http://instagram.com/" + users[userId].username;
    $window.open(url, '_blank');
  }

  UserModel.prototype.unfollow = function(userId) {
    // var self = this,
    //   deferred = $q.defer(),
    //   url = Configuration.baseApiUrl + "/users/unfollow";

    // $http.delete(url, {id: userId}).then(function(result) {
    //   console.log('unfollow action return', result);
    //   deferred.resolve(result);
    // });

    // return deferred.promise;

    var url = "http://instagram.com/" + users[userId].username;
    $window.open(url, '_blank');
  }

  return new UserModel();
});
