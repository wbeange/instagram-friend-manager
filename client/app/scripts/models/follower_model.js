'use strict';

angular.module('clientApp').factory('FollowerModel', function($q, $http, Auth, Model) {
  
  //
  // constructor
  //

  function FollowerModel() {
    Model.call(this, 'followedBy');
  }

  //
  // inheritence
  //

  FollowerModel.prototype = Object.create(Model.prototype);
  FollowerModel.prototype.constructor = FollowerModel;

  //
  // public
  //

  FollowerModel.prototype.all = function(userId) {
    var url = 'https://api.instagram.com/v1/users/' + userId + '/followed-by' + '?access_token=' + Auth.accessToken() + '&callback=JSON_CALLBACK';

    return Model.prototype.all.call(this, userId, url);
  }

  return new FollowerModel();
});
