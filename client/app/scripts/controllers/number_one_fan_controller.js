'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:NumberOneFanCtrl
 * @description
 * # NumberOneFanCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('NumberOneFanCtrl', function ($scope, NumberOneFanModel) {

    $scope.isLoading = true;
    NumberOneFanModel.get().then(function(data) {
      $scope.besties = data;
      $scope.isLoading = false;
    });
  });
