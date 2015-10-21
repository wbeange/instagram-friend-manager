'use strict';

angular.module('clientApp').controller('HeaderCtrl', function ($scope, $http, Configuration, Auth, UserModel) {
  $scope.Auth = Auth;

  // TODO - Refactor to pull from client session cookie which stores user data object
  var loadUser = function() {
    UserModel.get().then(function(data) {
      $scope.user = data;
    });
  };

  if($scope.Auth.isSignedIn()) {
    loadUser();
  }

  $scope.$on('wb-authenticated', function(event, isLoggedIn) {
    if(isLoggedIn) {
      loadUser();
    }
  });
});
