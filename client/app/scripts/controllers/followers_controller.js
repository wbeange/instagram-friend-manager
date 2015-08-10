'use strict';

angular.module('clientApp').controller('FollowersCtrl', function ($scope, UserModel, FollowerModel) {
  $scope.subHeader = 'People who follow you.';

  $scope.isLoading = true;
  UserModel.get().then(function(data) {
    var userId = data.id;

    FollowerModel.get(userId).then(function(users) {
      $scope.users = users;
      $scope.isLoading = false;
    });
  });
});
