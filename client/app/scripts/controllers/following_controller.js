'use strict';

angular.module('clientApp').controller('FollowingCtrl', function ($scope, UserModel, FollowModel) {

  UserModel.get().then(function(data) {
    var userId = data.id;

    FollowModel.all(userId).then(function(follows) {
      $scope.users = follows;
    });
  });
});
