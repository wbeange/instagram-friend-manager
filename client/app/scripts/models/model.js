'use strict';

angular.module('clientApp').factory('Model', function($q, $http) {

  //
  // constructor
  //

  function Model() {
    this.url = '';
    this.cursor = '';
    this.users = [];
  }

  //
  // public
  //

  Model.prototype.all = function(userId, url) {
    this.url = url;
    
    return this._recursiveAll();
  }

  //
  // private
  //

  Model.prototype._recursiveAll = function(deferred) {
    if(deferred === undefined) {
      var deferred = $q.defer();
    }
    
    var fullUrl = this.url + this.cursor;

    var self = this;

    $http.jsonp(fullUrl).then(
      // success
      function(results) {
        
        // lazy field placements
        _.each(results.data.data, function(result) {
          result.counts = {
            media: '---',
            followed_by: '---',
            follows: '---'
          }
        });

        // build return array
        self.users = self.users.concat(results.data.data);

        if(results.data.pagination.next_cursor) {
          self.cursor = '&cursor=' + results.data.pagination.next_cursor;

          self._recursiveAll(deferred);
        } else {
          // double data.data because of jsonp return
          deferred.resolve(self.users);
        }
      },

      // error
      function() {
        deferred.reject();
      });

    return deferred.promise;
  }

  return Model;
});
