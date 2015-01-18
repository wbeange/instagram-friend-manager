'use strict';

angular.module('clientApp').controller('FollowingCtrl', function ($scope, UserModel, FollowingModel) {

  UserModel.get().then(function(data) {
    var userId = data.id;

    FollowingModel.all(userId).then(function(follows) {
      $scope.users = follows;
    });
  });
});
