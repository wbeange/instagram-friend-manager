'use strict';

angular.module('clientApp').controller('IdolsCtrl', function ($scope, Auth, IdolModel) {
  $scope.subHeader = 'People you follow that don\'t follow you back.';

  $scope.isLoading = true;
  IdolModel.all(Auth.userId()).then(function(idols) {
    $scope.users = idols;
    $scope.isLoading = false;
  });
});
