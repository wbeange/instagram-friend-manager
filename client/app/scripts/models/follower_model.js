'use strict';

angular.module('clientApp').factory('FollowerModel', function($q, $http, Auth) {

  //
  // constructor
  //

  function FollowerModel() {

  }  

  //
  // public
  //

  FollowerModel.prototype.all = function(userId) {    
    var url = 'https://api.instagram.com/v1/users/' + userId + '/follows' + '?access_token=' + Auth.accessToken() + '&callback=JSON_CALLBACK';

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

  return new FollowerModel();
});
