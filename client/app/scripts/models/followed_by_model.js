'use strict';

angular.module('clientApp').factory('FollowedByModel', function($q, $http, Auth) {

  //
  // constructor
  //

  function FollowedByModel() {

  }

  //
  // public
  //

  var cursor = '',
      users = [],
      url;

  FollowedByModel.prototype.all = function(userId) {    
    url = 'https://api.instagram.com/v1/users/' + userId + '/followed-by' + '?access_token=' + Auth.accessToken() + '&callback=JSON_CALLBACK';
    cursor = '';
    users = [];

    return this.recursiveAll();
  }

  FollowedByModel.prototype.recursiveAll = function(deferred) {
    if(deferred === undefined) {
      var deferred = $q.defer();
    }
    
    var fullUrl = url + cursor;

    var self = this;

    $http.jsonp(fullUrl).then(
      // success
      function(results) {    
        // build return array
        users = users.concat(results.data.data);

        // if(results.data.pagination.next_cursor) {
        //   cursor = '&cursor=' + results.data.pagination.next_cursor;

        //   self.recursiveAll(deferred);
        // } else {
          // double data.data because of jsonp return
          deferred.resolve(users);
        // }      
      },

      // error
      function() {
        deferred.reject();
      });

    return deferred.promise;
  }

  return new FollowedByModel();
});
