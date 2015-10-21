'use strict';

angular.module('clientApp').controller('FansCtrl', function ($scope, Auth, FanModel) {
  $scope.subHeader = 'People you don\'t follow that follow you.';

  $scope.isLoading = true;
  FanModel.all(Auth.userId()).then(function(fans) {
    $scope.users = fans;
    $scope.isLoading = false;
  });
});
