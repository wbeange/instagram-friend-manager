'use strict';

angular.module('friendManager.services').service('Instagram', ['$http', '$q', 'Auth', function($http, $q, Auth) {
  
  //
  //Public
  //

  this.getRelationshipData = function() {

    return $q.all([
      getFollows(),
      getFollowedBy()
      ]);
  }

  //
  //Private
  //

  var getFollows = function() {
    var accessCode = Auth.getAccessCode();
    var userId = '183356248';
    var url = 'https://api.instagram.com/v1/users/' + userId + '/follows' + '?access_token=' + accessCode + '&callback=JSON_CALLBACK';

    return _getUsers(_getUsers, url, '', []);
  }

  var getFollowedBy = function() {
    var accessCode = Auth.getAccessCode();
    var userId = '183356248';
    var url = 'https://api.instagram.com/v1/users/' + userId + '/followed-by' + '?access_token=' + accessCode + '&callback=JSON_CALLBACK';

    return _getUsers(_getUsers, url, '', []);
  }

  //Recursively fetch users from Instagram API
  var _getUsers = function(callback_fn, url, cursor, users) {

    var fullUrl = url + cursor;

    return $http.jsonp(fullUrl).then(
      //success
      function(result) {

        //add follow users from server to array
        users = users.concat(result.data.data);

        //check if more data needs to be retrieved from the server
        if(result.data.pagination.next_cursor)
        {
          cursor = '&cursor=' + result.data.pagination.next_cursor;
          
          return callback_fn(callback_fn, url, cursor, users);
        }
        else
        {
          return users;
        }
      }
    )};

}]);