'use strict';

angular.module('clientApp').factory('FollowerModel', function($q, $http, Auth, Model) {
  
  var users;

  //
  // constructor
  //

  function FollowerModel() {
    Model.call(this, 'follower');
  }

  //
  // inheritence
  //

  FollowerModel.prototype = Object.create(Model.prototype);
  FollowerModel.prototype.constructor = FollowerModel;

  //
  // public
  //

  FollowerModel.prototype.all = function(userId) {
    if(users === undefined) {
      var url = 'https://api.instagram.com/v1/users/' + userId + '/followed-by' + '?access_token=' + Auth.accessToken() + '&callback=JSON_CALLBACK';

      var deferred = $q.defer();
      
      Model.prototype.all.call(this, userId, url).then(
        function(result) {
          
          // intercept users and store locally
          users = result;

          deferred.resolve(users);
        },
        function() {
          deferred.reject();
        });

      return deferred.promise;
    } else {
      
      var deferred = $q.defer();
      deferred.resolve(users);
      return deferred.promise;
    }
  }  

  return new FollowerModel();
});
