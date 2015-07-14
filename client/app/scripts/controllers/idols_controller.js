'use strict';

angular.module('clientApp').controller('IdolsCtrl', function ($scope, UserModel, IdolModel) {
  $scope.subHeader = 'People you follow that don\'t follow you back.';

  UserModel.get().then(function(data) {
    var userId = data.id;

    IdolModel.all(userId).then(function(idols) {
      $scope.users = idols;
    });
  });
});
