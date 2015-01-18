 angular.module('clientApp').directive('wbTabSelect', function() {
  return {
    scope: {
      thisTab: "=",
      curTab: "="
    },

    link: function(scope, element, attrs) {
      scope.$watch('thisTab', function() {

      });
    }
  }
});
