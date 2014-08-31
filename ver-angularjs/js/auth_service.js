'use strict';

angular.module('friendManager.services').factory('Auth', ['$http', '$cookieStore', '$location', function($http, $cookieStore, $location) {

  //OAuth redirect_url:
  var redirectUrl = 'http://localhost/';

  var redirInstaAuth = function() {   

    var authorization_url = 'https://instagram.com/oauth/authorize/';
    authorization_url += '?client_id=0ed0e250ea854a129e9a849a8ee0ed9c';  
    authorization_url += '&response_type=token';      
    authorization_url += '&redirect_uri=' + redirectUrl;
    authorization_url += '&scope=relationships';

    window.location.href = authorization_url;
  }

  return {
    init: function() {
      console.log('hello auth factory');
    },

    getAccessCode: function() {
      var accessCode = $cookieStore.get("accessCode");

      if(accessCode === undefined) {
        
        var url = $location.url();

        if(url.indexOf('access_token') == -1)
        {
          redirInstaAuth();
        }
        else
        {
          if(url.indexOf('/access_token=') != -1)
          {
            accessCode = url.replace('/access_token=', '');
            $cookieStore.put("accessCode", accessCode);

            $location.url('/');
          }
        }
      }

      return accessCode;
    }
  };

}]);