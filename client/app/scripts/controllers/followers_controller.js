'use strict';

angular.module('clientApp').controller('FollowersCtrl', function ($scope, UserModel, FollowedByModel) {

  // UserModel.get().then(function(data) {
    // var userId = data.id;

    $scope.view = 'followers';

    // FollowedByModel.all(userId).then(function(followedBys) {
    //   $scope.follows = followedBys;
    // });
  // });
});
