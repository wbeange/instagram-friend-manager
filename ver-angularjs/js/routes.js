'use strict';

//routing!!!
angular.module('friendManager').config(function($routeProvider, $locationProvider){

  // $routeProvider.
  //   when('/', {
  //     templateUrl: 'views/instagram.html',
  //     controller: 'UsersCtrl',
  //     reloadOnSearch: false,
  //   }).
  //   when('/auth/', {
  //     templateUrl: 'views/auth.html',
  //     controller: 'AuthCtrl'
  //   }).
  //   otherwise({
  //     redirectTo: '/'
  //   });

    $locationProvider.html5Mode(true);
});