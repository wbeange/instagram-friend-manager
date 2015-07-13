'use strict';

angular.module('clientApp').controller('HeaderCtrl', function ($scope, Auth, UserModel) {
  // $scope.Auth = Auth;

  var load = function() {
    UserModel.get().then(function(data) {
      $scope.user = data;
    });
  }

  load();

  // // TOOD: Hack to ensure client authenticates before header loads
  // if(Auth.isSignedIn()) {

  // } else {
  //   var unbind = $scope.$on('authenticated', function() {
  //     load();
  //     unbind();
  //   })
  // }
});
