'use strict';

// Getting Started
// $ bower install
// $ grunt serve

angular
  // app
  .module('clientApp', ['ngRoute', 'ngCookies'])

  // routes
  .config(function ($routeProvider) {
    $routeProvider
      .when('/followers', { controller: 'UserCollectionCtrl', templateUrl: 'views/users.html', reloadOnSearch: false })
      .when('/following', { controller: 'UserCollectionCtrl', templateUrl: 'views/users.html', reloadOnSearch: false })
      .when('/friends', { controller: 'UserCollectionCtrl', templateUrl: 'views/users.html', reloadOnSearch: false })
      .when('/fans', { controller: 'UserCollectionCtrl', templateUrl: 'views/users.html', reloadOnSearch: false })
      .when('/idols', { controller: 'UserCollectionCtrl', templateUrl: 'views/users.html', reloadOnSearch: false })
      .when('/login', { controller: 'LoginCtrl', templateUrl: 'views/login.html', reloadOnSearch: false })
      .when('/besties',  { controller: 'NumberOneFanCtrl', templateUrl: 'views/number_one_fan.html', reloadOnSearch: false })

      .otherwise({ redirectTo: '/login', reloadOnSearch: false });
  })

  .config(function($locationProvider, $httpProvider) {
    // CORS requests with credentials
    $httpProvider.defaults.withCredentials = true;

    // HttpInterceptor to handle 401s
    $httpProvider.interceptors.push('HttpInterceptor');
  })

  .run(function($rootScope, Auth) {
    // initiate authentication handler
    Auth.init();
  });
