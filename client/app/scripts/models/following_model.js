'use strict';

angular.module('clientApp').factory('FollowingModel', function($q, $http, Auth, Model) {
  
  var users;

  //
  // constructor
  //

  function FollowingModel() {
    Model.call(this, 'follow');
  }

  //
  // inheritence
  //

  FollowingModel.prototype = Object.create(Model.prototype);
  FollowingModel.prototype.constructor = FollowingModel;

  //
  // public
  //

  FollowingModel.prototype.all = function(userId) {
    if(users === undefined) {
      var url = 'https://api.instagram.com/v1/users/' + userId + '/follows' + '?access_token=' + Auth.accessToken() + '&callback=JSON_CALLBACK';

      var deferred = $q.defer();
      
      Model.prototype.all.call(this, userId, url).then(
        function(result) {
          // intercept users and store locally ;)
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

  return new FollowingModel();
});
