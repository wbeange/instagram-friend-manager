'use strict';

angular.module('clientApp').controller('FansCtrl', function ($scope, UserModel, FanModel) {
  $scope.subHeader = 'People you don\'t follow that follow you.';

  UserModel.get().then(function(data) {
    var userId = data.id;

    FanModel.all(userId).then(function(fans) {
      $scope.users = fans;
    });
  });
});
