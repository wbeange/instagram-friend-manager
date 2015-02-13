'use strict';

angular.module('clientApp').controller('HeaderCtrl', function ($scope, Auth, UserModel) {
  $scope.Auth = Auth;

  UserModel.get().then(function(data) {
    $scope.user = data;

    UserModel.relationship().then(function(data) {
      // set each attr individually so reference isn't broken
      $scope.user.counts.media       = data.counts.media;
      $scope.user.counts.follows     = data.counts.follows;
      $scope.user.counts.followed_by = data.counts.followed_by;
    });
  });
});
