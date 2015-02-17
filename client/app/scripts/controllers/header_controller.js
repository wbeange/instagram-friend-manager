'use strict';

angular.module('clientApp').controller('HeaderCtrl', function ($scope, Auth, UserModel) {
  $scope.Auth = Auth;

  var load = function() {
    UserModel.get().then(function(data) {
      $scope.user = data;
    });
  }

  // TOOD: Hack to ensure client authenticates before header loads
  if(Auth.isSignedIn()) {
    load();
  } else {
    var unbind = $scope.$on('authenticated', function() {
      load();
      unbind();
    })
  }
});
