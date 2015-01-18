'use strict';

angular.module('clientApp').controller('FriendsCtrl', function ($scope, UserModel, DifferenceModel) {

  UserModel.get().then(function(data) {
    var userId = data.id;
    
    DifferenceModel.friends(userId).then(function(friends) {
      $scope.users = friends;
    });    
  });
});
