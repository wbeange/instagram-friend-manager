'use strict';

angular.module('clientApp').factory('DifferenceModel', function($q, $http, FollowingModel, FollowerModel) {

  //
  // constructor
  //

  function DifferenceModel() {

  }

  //
  // private
  //

  // find difference in arrays
  DifferenceModel.prototype.findDifference = function(usersArray1, usersArray2) {
    var userIds = _.difference(_.pluck(usersArray1, 'id'), _.pluck(usersArray2, 'id'));

    return _.filter(usersArray1, function(user) {
      return _.contains(userIds, user.id);
    });
  };

  // find mutual connections
  DifferenceModel.prototype.findFriends = function(usersArray1, usersArray2) {
    var userIds = _.intersection(_.pluck(usersArray1, 'id'), _.pluck(usersArray2, 'id'));

    return _.filter(usersArray2, function(user) {
      return _.contains(userIds, user.id);
    });
  };  

  DifferenceModel.prototype.all = function(userId) {
    var urlCalls = [
      FollowingModel.all(userId),
      FollowerModel.all(userId)
    ];

    var deferred = $q.defer();

    var self = this;

    $q.all(urlCalls).then(
      function(results) {
        deferred.resolve(results);
      },
      
      function() {
        deferred.reject();
      }
    );

    return deferred.promise;
  }  

  //
  // public
  //

  DifferenceModel.prototype.fans = function(userId) {
    var deferred = $q.defer();

    var self = this;

    this.all(userId).then(
      // success
      function(results) {    
        var following = results[0];
        var followers = results[1];
        
        var fans = self.findDifference(followers, following);
        
        deferred.resolve(fans);
      },

      // error
      function() {
        deferred.reject();
      });

    return deferred.promise;
  }

  DifferenceModel.prototype.idols = function(userId) {
    var deferred = $q.defer();

    var self = this;

    this.all(userId).then(
      // success
      function(results) {    
        var following = results[0];
        var followers = results[1];

        var idols = self.findDifference(following, followers);
        
        deferred.resolve(idols);
      },

      // error
      function() {
        deferred.reject();
      });

    return deferred.promise;
  }

  DifferenceModel.prototype.friends = function(userId) {
    var deferred = $q.defer();

    var self = this;

    this.all(userId).then(
      // success
      function(results) {    
        var following = results[0];
        var followers = results[1];
        
        var friends = self.findFriends(following, followers);
        
        deferred.resolve(friends);
      },

      // error
      function() {
        deferred.reject();
      });

    return deferred.promise;
  }

  return new DifferenceModel();
});
