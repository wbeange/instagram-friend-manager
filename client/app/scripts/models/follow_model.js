'use strict';

angular.module('clientApp').factory('FollowModel', function($q, $http, Auth, Model) {
  
  var users;

  //
  // constructor
  //

  function FollowModel() {
    Model.call(this, 'follow');
  }

  //
  // inheritence
  //

  FollowModel.prototype = Object.create(Model.prototype);
  FollowModel.prototype.constructor = FollowModel;

  //
  // public
  //

  FollowModel.prototype.all = function(userId) {
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

  return new FollowModel();
});
