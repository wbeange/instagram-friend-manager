'use strict';

angular.module('clientApp').controller('FollowersCtrl', function ($scope, UserModel, FollowerModel) {

  UserModel.get().then(function(data) {
    var userId = data.id;

    FollowerModel.all(userId).then(function(followedBys) {
      $scope.users = followedBys;
    });
  });
});
