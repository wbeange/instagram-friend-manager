'use strict';

angular.module('clientApp').controller('FollowersCtrl', function ($scope, Auth, FollowerModel) {
  $scope.subHeader = 'People who follow you.';

  $scope.isLoading = true;
  FollowerModel.get(Auth.userId()).then(function(users) {
    $scope.users = users;
    $scope.isLoading = false;
  });
});
