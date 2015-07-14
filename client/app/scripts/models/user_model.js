'use strict';

angular.module('clientApp').factory('UserModel', function($q, $http) {

  var users = [];

  //
  // constructor
  //

  function UserModel() {
    this.isLoading = false;
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

  // UserModel.prototype.relationship = function(userId) {

  //   var url = "https://api.instagram.com/v1/users/" + userId + "/relationship?access_token=" + Auth.accessToken() + "&callback=JSON_CALLBACK";

  //   var deferred = $q.defer();

  //   this.isLoading = true;
  //   var self = this;
  //   $http.jsonp(url).then(function(results) {

  //     // double data.data because of jsonp return
  //     deferred.resolve(results.data.data);
  //   },

  //   function(results) {
  //     self.isLoading = false;
  //     deferred.reject(results);
  //   });

  //   return deferred.promise;
  // }

  return new UserModel();
});
