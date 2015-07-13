'use strict';

angular
  // app
  .module('clientApp', [
    'ngRoute',
    'ngCookies'
  ])
  // routes
  .config(function ($routeProvider) {
    $routeProvider
      .when('/followers',   { controller: 'FollowersCtrl',  templateUrl: 'views/main.html', reloadOnSearch: false })
      // .when('/following',   { controller: 'FollowingCtrl',  templateUrl: 'views/main.html', reloadOnSearch: false })
      // .when('/friends',     { controller: 'FriendsCtrl',    templateUrl: 'views/main.html', reloadOnSearch: false })
      // .when('/fans',        { controller: 'FansCtrl',       templateUrl: 'views/main.html', reloadOnSearch: false })
      // .when('/idols',       { controller: 'IdolsCtrl',      templateUrl: 'views/main.html', reloadOnSearch: false })

      .otherwise({ redirectTo: '/followers', reloadOnSearch: false });
  })

  // enable html5Mode for pushstate ('#'-less URLs)
  .config(function($locationProvider, $httpProvider) {
    // $locationProvider.html5Mode(true);
    // $locationProvider.hashPrefix('#');

    $httpProvider.defaults.withCredentials = true;
  })

  .run(function($rootScope, Auth) {
    Auth.init();
  });
