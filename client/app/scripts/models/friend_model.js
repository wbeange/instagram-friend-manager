'use strict';

angular.module('clientApp').factory('FriendModel', function($q, $http, FollowingModel, FollowerModel) {

  //
  // constructor
  //

  function FriendModel() {

  }

  //
  // private
  //

  // find mutual connections
  FriendModel.prototype.findFriends = function(following, followers) {
    var userIds = _.intersection(_.pluck(following, 'id'), _.pluck(followers, 'id'));

    return _.filter(followers, function(user) {
      return _.contains(userIds, user.id);
    });
  };

  //
  // public
  //

  FriendModel.prototype.all = function(userId) {
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

        var friends = self.findFriends(following, followers);

        deferred.resolve(friends);
      },

      function() {
        deferred.reject();
      }
    );

    return deferred.promise;
  }

  return new FriendModel();
});
