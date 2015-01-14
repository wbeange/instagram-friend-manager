'use strict';

angular.module('clientApp')
  .factory('Auth', ['$rootScope', '$http', '$cookieStore', '$location', '$q', function($rootScope, $http, $cookieStore, $location, $q) {

  var accessToken;
  var user;

  return {
    init: function() {
      var self = this;

      $rootScope.$on('$routeChangeStart', function(event, next, current) {
        
        // check if we are signed in
        if(!self.isSignedIn()) {

          // TODO: move this to a separate URL
          // redirect case: extract access token from hash
          if($location.hash() !== '') {
            
            var hash = $location.hash();
            var hashExploded = hash.split('=');

            accessToken = hashExploded[1];

            
            $location.hash(null);

            self.getUserData().then(
              
              // success
              function(data) {
                console.log('getUserData success', data);

                user = data;

                // finished auth, manually clean url and redir to index
                $location.hash(null);
                $location.url('');
              
              // error
              }, function(data) {

              });
          
          // redirect to instagram website
          } else {
            self.authenticate();
          }
        }
      });
    },

    isSignedIn: function() {
      console.log('Auth.isSignedIn() - accessToken', accessToken);

      return accessToken !== undefined;
    },

    getUserData: function() {
      var url = "https://api.instagram.com/v1/users/self?access_token=" + accessToken + "&callback=JSON_CALLBACK";

      // using jsonp for oauth (implicit) b/c instagram api does not support CORS
      var deferred = $q.defer();

      $http.jsonp(url).then(function(results) {
        // double data.data because of jsonp return
        deferred.resolve(results.data.data);
      },

      function(results) {
        deferred.reject(results);
      });

      return deferred.promise;
    },

    authenticate: function() {
      var redirectUrl = 'http://localhost:9000/';

      var authorizationUrl = 'https://instagram.com/oauth/authorize/';
      authorizationUrl += '?client_id=0ed0e250ea854a129e9a849a8ee0ed9c';
      authorizationUrl += '&response_type=token';
      authorizationUrl += '&redirect_uri=' + redirectUrl;
      authorizationUrl += '&scope=relationships';

      window.location.href = authorizationUrl;
    },    

    getAccessToken: function() {
      return accessToken;
    }
  };

}]);