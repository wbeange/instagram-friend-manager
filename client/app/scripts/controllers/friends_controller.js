'use strict';

angular.module('clientApp').controller('FriendsCtrl', function ($scope, Auth, FriendModel) {
  $scope.subHeader = 'People you follow that follow you back!';

  $scope.isLoading = true;
  FriendModel.all(Auth.userId()).then(function(friends) {
    $scope.users = friends;
    $scope.isLoading = false;
  });
});
