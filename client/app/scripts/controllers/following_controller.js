'use strict';

angular.module('clientApp').controller('FollowingCtrl', function ($scope, UserModel, FollowModel) {

  // UserModel.get().then(function(data) {
    // var userId = data.id;

    $scope.view = 'following';

    // FollowModel.all(userId).then(function(follows) {
    //   $scope.follows = follows;
    // });
  // });
});
