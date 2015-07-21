'use strict';

angular.module('clientApp').controller('HeaderCtrl', function ($scope, Auth, UserModel) {
  $scope.Auth = Auth;

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
