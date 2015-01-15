'use strict';

angular.module('clientApp').factory('FollowedByModel', function($q, $http, Auth, Model) {
  
  //
  // constructor
  //

  function FollowedByModel() {
    Model.call(this, 'followedBy');
  }

  //
  // inheritence
  //

  FollowedByModel.prototype = Object.create(Model.prototype);
  FollowedByModel.prototype.constructor = FollowedByModel;

  //
  // public
  //

  FollowedByModel.prototype.all = function(userId) {
    var url = 'https://api.instagram.com/v1/users/' + userId + '/followed-by' + '?access_token=' + Auth.accessToken() + '&callback=JSON_CALLBACK';

    return Model.prototype.all.call(this, userId, url);
  }

  return new FollowedByModel();
});
