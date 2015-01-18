'use strict';

angular.module('clientApp').controller('IdolsCtrl', function ($scope, UserModel, DifferenceModel) {

  // UserModel.get().then(function(data) {
    // var userId = data.id;

    $scope.view = 'idols';

    // DifferenceModel.idols(userId).then(function(fans) {
    //   $scope.follows = fans;
    // });
  // });
});
