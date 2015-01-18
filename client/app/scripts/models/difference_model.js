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
    var differenceKeyValue = {};

    //check if there is a mutual 'friends' relationship
    //ie user exists in both arrays
    for(var i=0; i<usersArray1.length; i++) {
      var friends = false;

      for(var j=0; j<usersArray2.length; j++) {
        if(usersArray1[i].id == usersArray2[j].id) {
          friends = true;
          continue;
        }
      }

      if(friends === false) {
        differenceKeyValue[ usersArray1[i].id ] = usersArray1[i];
      }
    }
    
    return differenceKeyValue;
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
        var follows = results[0];
        var followedBy = results[1];
        
        var fans = self.findDifference(followedBy, follows);
        
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
        var follows = results[0];
        var followedBy = results[1];
        
        var fans = self.findDifference(follows, followedBy);
        
        deferred.resolve(fans);
      },

      // error
      function() {
        deferred.reject();
      });

    return deferred.promise;
  }  

  return new DifferenceModel();
});
