'use strict';

angular.module('clientApp').controller('FriendsCtrl', function ($scope, UserModel, FriendModel) {
  $scope.subHeader = 'People you follow that follow you back!';

  UserModel.get().then(function(data) {
    var userId = data.id;
    
    FriendModel.all(userId).then(function(friends) {
      $scope.users = friends;
    });    
  });
});
