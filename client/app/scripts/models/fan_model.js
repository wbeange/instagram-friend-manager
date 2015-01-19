'use strict';

angular.module('clientApp').factory('FanModel', function($q, $http, FollowingModel, FollowerModel) {

  //
  // constructor
  //

  function FanModel() {

  }

  //
  // private
  //

  // find difference in arrays
  FanModel.prototype.findDifference = function(followers, following) {
    var userIds = _.difference(_.pluck(followers, 'id'), _.pluck(following, 'id'));

    return _.filter(followers, function(user) {
      return _.contains(userIds, user.id);
    });
  };

  //
  // public
  //  

  FanModel.prototype.all = function(userId) {
    var urlCalls = [
      FollowingModel.all(userId),
      FollowerModel.all(userId)
    ];

    var deferred = $q.defer();

    var self = this;

    $q.all(urlCalls).then(
      function(results) {
        var following = results[0];
        var followers = results[1];
        
        var fans = self.findDifference(followers, following);

        deferred.resolve(fans);
      },
      
      function() {
        deferred.reject();
      }
    );

    return deferred.promise;
  }

  return new FanModel();
});
