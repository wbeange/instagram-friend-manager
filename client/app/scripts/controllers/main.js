'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp').controller('MainCtrl', function ($scope, UserModel, FollowModel, FollowedByModel, DifferenceModel) {
    UserModel.get().then(function(data) {
      var userId = data.id;

      // FollowModel.all(userId).then(function(follows) {
      //   $scope.follows = follows;
      // });

      // FollowedByModel.all(userId).then(function(followedBys) {
      //   $scope.follows = followedBys;
      // });

      // DifferenceModel.fans(userId).then(function(fans) {
      //   $scope.follows = fans;
      // });

      DifferenceModel.idols(userId).then(function(fans) {
        $scope.follows = fans;
      });
    });
  });
