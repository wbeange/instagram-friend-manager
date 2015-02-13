'use strict';

angular.module('clientApp').controller('FollowersCtrl', function ($scope, UserModel, FollowerModel) {
  $scope.subHeader = 'People who follow you.';

  UserModel.get().then(function(data) {
    var userId = data.id;

    FollowerModel.all(userId).then(function(followers) {
      $scope.users = followers;
    });
  });
});
