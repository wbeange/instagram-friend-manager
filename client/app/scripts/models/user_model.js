'use strict';

angular.module('clientApp').factory('UserModel', function($q, $http, Auth) {

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
      var url = "https://api.instagram.com/v1/users/self?access_token=" + Auth.accessToken() + "&callback=JSON_CALLBACK";
    } else {
      var url = "https://api.instagram.com/v1/users/" + userId + "?access_token=" + Auth.accessToken() + "&callback=JSON_CALLBACK";
    }

    var deferred = $q.defer();

    this.isLoading = true;
    var self = this;
    $http.jsonp(url).then(function(results) {
      self.isLoading = false;

      // double data.data because of jsonp return
      deferred.resolve(results.data.data);
    },

    function(results) {
      self.isLoading = false;
      deferred.reject(results);
    });

    return deferred.promise;
  }

  return new UserModel();
});
