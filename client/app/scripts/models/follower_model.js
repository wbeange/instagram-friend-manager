'use strict';

angular.module('clientApp').factory('FollowerModel', function($q, $http) {

  //
  // public
  //

  FollowerModel.prototype.all = function() {
    return false;
  }

  return new FollowerModel();
});
