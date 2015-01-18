'use strict';

angular.module('clientApp').controller('IdolsCtrl', function ($scope, UserModel, DifferenceModel) {

  UserModel.get().then(function(data) {
    var userId = data.id;

    DifferenceModel.idols(userId).then(function(idols) {
      $scope.users = idols;
    });
  });
});
