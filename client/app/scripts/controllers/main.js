'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('MainCtrl', function ($scope, UserModel, FollowerModel) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    UserModel.get().then(function(data) {
      var userId = data.id;

      FollowerModel.all(userId).then(function(followers) {
        console.log('MainCtrl FollowerModel.all()', followers);

        $scope.followers = followers;
      });      
    })
  });
