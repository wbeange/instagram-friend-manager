'use strict';

angular.module('clientApp').factory('IdolModel', function($q, $http, FollowingModel, FollowerModel) {

  //
  // constructor
  //

  function IdolModel() {

  }

  //
  // private
  //

  // find difference in arrays
  IdolModel.prototype.findDifference = function(following, followers) {
    var userIds = _.difference(_.pluck(following, 'id'), _.pluck(followers, 'id'));

    return _.filter(following, function(user) {
      return _.contains(userIds, user.id);
    });
  };

  //
  // public
  //

  IdolModel.prototype.all = function(userId) {
    var urlCalls = [
      FollowingModel.get(userId),
      FollowerModel.get(userId)
    ];

    var deferred = $q.defer();

    var self = this;

    $q.all(urlCalls).then(
      function(results) {
        var following = results[0];
        var followers = results[1];

        var idols = self.findDifference(following, followers);

        deferred.resolve(idols);
      },

      function() {
        deferred.reject();
      }
    );

    return deferred.promise;
  }

  return new IdolModel();
});
