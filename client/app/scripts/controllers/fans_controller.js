'use strict';

angular.module('clientApp').controller('FansCtrl', function ($scope, UserModel, FanModel) {

  UserModel.get().then(function(data) {
    var userId = data.id;

    FanModel.all(userId).then(function(fans) {
      $scope.users = fans;
    });
  });
});
