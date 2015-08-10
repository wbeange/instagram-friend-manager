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
            if(item.attributes['nav-tab'].value == $location.path()) {
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
