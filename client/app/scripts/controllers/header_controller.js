'use strict';

angular.module('clientApp').controller('HeaderCtrl', function ($scope, Auth, UserModel) {
  $scope.Auth = Auth;

  UserModel.get().then(function(data) {
    $scope.user = data;
  });
});
