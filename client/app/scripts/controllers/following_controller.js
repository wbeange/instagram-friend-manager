'use strict';

angular.module('clientApp').controller('FollowingCtrl', function ($scope, Auth, FollowingModel) {
  $scope.subHeader = 'People you follow.';

  $scope.isLoading = true;
  FollowingModel.get(Auth.userId()).then(function(users) {
    $scope.users = users;
    $scope.isLoading = false;
  });
});
