'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
angular
  .module('clientApp', [
    'ngRoute',
    'ngCookies'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {})
      .when('/followers',   { controller: 'FollowersCtrl',  templateUrl: 'views/main.html', reloadOnSearch: false })
      .when('/following',   { controller: 'FollowingCtrl',  templateUrl: 'views/main.html' })
      .when('/friends',     { controller: 'FriendsCtrl',    templateUrl: 'views/main.html' })
      .when('/fans',        { controller: 'FansCtrl',       templateUrl: 'views/main.html' })
      .when('/idols',       { controller: 'IdolsCtrl',      templateUrl: 'views/main.html' })

      .otherwise({ redirectTo: '/followers', reloadOnSearch: false });
  })

  // enable html5Mode for pushstate ('#'-less URLs)
  .config(function($locationProvider) {
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('#');
  })

  // authentication
  .run(function($rootScope, Auth) {
    Auth.init();
  });
