'use strict';

/**
 * @ngdoc directive
 * @name clientApp.directive:wbNavigationTabs
 * @description
 * # wbNavigationTabs
 */
angular.module('clientApp')
  .directive('wbNavigationTabs', function ($location) {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {

        // add / remove twitter bootstrap styling as needed
        var toggleSelected = function() {
          if(attrs.wbNavigationTabs == $location.path()) {
            element.addClass('active');
          } else {
            element.removeClass('active');
          }
        }

        // initial load
        toggleSelected();

        // on route change
        scope.$on('$routeChangeStart', function(next, current) {
          toggleSelected();
        });
      }
    };
  });
