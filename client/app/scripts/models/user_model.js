'use strict';

angular.module('clientApp').factory('UserModel', function($q, $http, Auth) {

  //
  // constructor
  //

  function UserModel() {
    
  }  

  //
  // public
  //

  UserModel.prototype.get = function() {
    var url = "https://api.instagram.com/v1/users/self?access_token=" + Auth.accessToken() + "&callback=JSON_CALLBACK";

    var deferred = $q.defer();

    $http.jsonp(url).then(function(results) {
      // double data.data because of jsonp return
      deferred.resolve(results.data.data);
    },

    function(results) {
      deferred.reject(results);
    });

    return deferred.promise;
  }

  return new UserModel();
});
