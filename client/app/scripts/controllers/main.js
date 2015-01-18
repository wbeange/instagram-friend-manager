'use strict';

angular.module('clientApp').controller('MainCtrl', function ($scope, UserModel, FollowModel, FollowedByModel, DifferenceModel) {
    
  $scope.tabs = [
    'followers',
    'following',
    'friends',
    'fans',
    'idols'
  ];

  $scope.curTab = "followers";


  UserModel.get().then(function(data) {
    // var userId = data.id;

    $scope.user = data;

    // FollowModel.all(userId).then(function(follows) {
    //   $scope.follows = follows;
    // });

    // FollowedByModel.all(userId).then(function(followedBys) {
    //   $scope.follows = followedBys;
    // });

    // DifferenceModel.fans(userId).then(function(fans) {
    //   $scope.follows = fans;
    // });

    // DifferenceModel.idols(userId).then(function(fans) {
    //   $scope.follows = fans;
    // });
  });
});
