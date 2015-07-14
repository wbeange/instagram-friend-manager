'use strict';

angular.module('clientApp').controller('FollowingCtrl', function ($scope, UserModel, FollowingModel) {
  $scope.subHeader = 'People you follow.';

  UserModel.get().then(function(data) {
    var userId = data.id;

    FollowingModel.get(userId).then(function(users) {
      $scope.users = users;
    });
  });
});
