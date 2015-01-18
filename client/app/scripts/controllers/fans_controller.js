'use strict';

angular.module('clientApp').controller('FansCtrl', function ($scope, UserModel, DifferenceModel) {

  // UserModel.get().then(function(data) {
    // var userId = data.id;

    $scope.view = 'fans';

    // DifferenceModel.fans(userId).then(function(fans) {
    //   $scope.follows = fans;
    // });
  // });
});
