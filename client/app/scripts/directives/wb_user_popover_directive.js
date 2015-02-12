 angular.module('clientApp').directive('wbUserPopover', function($compile, $timeout, $interpolate, $templateCache) {
  return {
    restrict: "A",
    replace: true,
    scope: {
      user: "=wbUserPopover"  
    },

    link: function(scope, element, attrs) {
      var elId = 'user_popover_' + scope.user.id;

      // view in template
      var html = $templateCache.get('user_popup_template');

      // pop var w/ interpolate
      html = $interpolate(html)({ elId: elId, user: scope.user });

      // initialize Javascript Bootstrap Popover library element
      $( element ).popover({
        html: true,
        placement: 'bottom',
        trigger: 'hover',
        content: html
      });

      // compile html on hover for ng-src directive, etc...
      $( element ).mouseenter(function() {
        $compile( $('#'+elId).contents() )(scope); 
      });

    }
  }
});
