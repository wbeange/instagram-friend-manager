'use strict';

angular.module('clientApp').factory('FollowModel', function($q, $http, Auth, Model) {
  
  //
  // constructor
  //

  function FollowModel() {
    Model.call(this, 'follow');
  }

  //
  // inheritence
  //

  FollowModel.prototype = Object.create(Model.prototype);
  FollowModel.prototype.constructor = FollowModel;

  //
  // public
  //

  FollowModel.prototype.all = function(userId) {
    var url = 'https://api.instagram.com/v1/users/' + userId + '/follows' + '?access_token=' + Auth.accessToken() + '&callback=JSON_CALLBACK';

    return Model.prototype.all.call(this, userId, url);
  }

  return new FollowModel();
});
