'use strict';

angular.module('clientApp').controller('FriendsCtrl', function ($scope, UserModel) {

  UserModel.get().then(function(data) {
    var userId = data.id;

    
  });
});
