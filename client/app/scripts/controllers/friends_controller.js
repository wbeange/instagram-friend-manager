'use strict';

angular.module('clientApp').controller('FriendsCtrl', function ($scope, UserModel, FriendModel) {
  $scope.subHeader = 'People you follow that follow you back!';

  $scope.isLoading = true;
  UserModel.get().then(function(data) {
    var userId = data.id;

    FriendModel.all(userId).then(function(friends) {
      $scope.users = friends;
      $scope.isLoading = false;
    });
  });
});
