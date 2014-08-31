'use strict';

(function(){

  angular.module('friendManager.controllers', []);
  angular.module('friendManager.services', ['ngCookies']);

  var app = angular.module('friendManager', [
    'friendManager.controllers',
    'friendManager.services', 
    'ngRoute']);

  /*

  TODO:

  fix insta auth routing issues
  friendship toggle serverside call
  error handling / max requests handling
  user div styling
    maybe small with hover
    buttons consistent size
    no underline / blue anchor test for username
    switch button on hover might look nicer

  */

})();