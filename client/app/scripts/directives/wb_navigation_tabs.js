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

        // select all tabs
        var items = element.find('li');

        // add / remove twitter bootstrap styling as needed
        var toggleSelected = function() {
          _.each(items, function(item) {

            var anchor = angular.element(item).children();
            var href = anchor.attr('href');
            var location = '#' + $location.path();

            if(href === location) {
              $(item).addClass('active');
            } else {
              $(item).removeClass('active');
            }
          });
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
