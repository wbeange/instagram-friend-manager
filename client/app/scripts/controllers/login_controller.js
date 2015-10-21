'use strict';

angular.module('clientApp').controller('LoginCtrl', function ($scope, Auth, $cookies) {
  $scope.Auth = Auth;
});
