'use strict';

angular.module('clientApp').factory('FollowerModel', function($q, $http, Auth) {

  //
  // constructor
  //

  function FollowerModel() {

  }

  //
  // public
  //

  var cursor = '',
      followers = [],
      url;

  FollowerModel.prototype.all = function(userId) {    
    url = 'https://api.instagram.com/v1/users/' + userId + '/follows' + '?access_token=' + Auth.accessToken() + '&callback=JSON_CALLBACK';
    cursor = '';
    followers = [];

    return this.recursiveAll();
  }

  FollowerModel.prototype.recursiveAll = function(deferred) {
    if(deferred === undefined) {
      var deferred = $q.defer();
    }
    
    var fullUrl = url + cursor;

    var self = this;

    $http.jsonp(fullUrl).then(
      // success
      function(results) {    
        // build return array
        followers = followers.concat(results.data.data);

        if(results.data.pagination.next_cursor) {
          cursor = '&cursor=' + results.data.pagination.next_cursor;

          self.recursiveAll(deferred);
        } else {
          // double data.data because of jsonp return
          deferred.resolve(followers);
        }      
      },

      // error
      function() {
        deferred.reject();
      });

    return deferred.promise;
  }

  return new FollowerModel();
});
