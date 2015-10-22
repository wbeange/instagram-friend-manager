'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:UserCollectionCtrl
 * @description
 * # UserCollectionCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('UserCollectionCtrl', function ($scope, $location, Auth, FollowerModel, FollowingModel, FriendModel, FanModel, IdolModel) {

    //
    // controller variables
    //

    var userId = Auth.userId(),
      path = $location.path();

    var pathOptions = {
      '/followers': {
        model: FollowerModel,
        subHeader: 'People who follow you.',
      },

      '/following': {
        model: FollowingModel,
        subHeader: 'People you follow.',
      },

      '/friends': {
        model: FriendModel,
        subHeader: 'People you follow that follow you back!',
      },

      '/fans': {
        model: FanModel,
        subHeader: 'People you don\'t follow that follow you.',
      },

      '/idols': {
        model: IdolModel,
        subHeader: 'People you follow that don\'t follow you back.',
      },
    }

    //
    // view variables
    //

    $scope.isLoading = true;
    $scope.subHeader = pathOptions[path].subHeader;
    $scope.users = [];

    //
    // initialization
    //

    pathOptions[path].model.all(userId).then(function(users) {
      $scope.users = users;
      $scope.isLoading = false;
    });

  });
