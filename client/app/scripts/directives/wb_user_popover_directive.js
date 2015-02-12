'use strict';

angular.module('clientApp').directive('wbUserPopover', function($rootScope, $compile, $timeout, $interpolate, $templateCache, UserModel) {
  return {
    restrict: 'A',
    replace: true,
    scope: {
      user: '=wbUserPopover'
    },

    link: function(scope, element, attrs) {
      // view in template
      var html = $templateCache.get('user_popup_template');

      // initialize Javascript Bootstrap Popover library element
      $( element ).popover({
        html: true,
        placement: 'auto',
        trigger: 'manual',
        content: html
      });


      // manually handling popover on/off
      var mouseoverEvent;

      var setMouseleaveEvent = function() {
        cancelMouseoverEvent();

        mouseoverEvent = $timeout(function() {
          // manually hide popover
          $( element ).popover('hide');
        }, 500);        
      }

      var cancelMouseoverEvent = function () {
        if(mouseoverEvent) {
          $timeout.cancel(mouseoverEvent);
          mouseoverEvent = undefined;
        }
      }
      
      $( element )

        // when you enter tile preview, show popover
        .on('mouseenter', function() {
          $rootScope.$emit('close-popovers', scope.user.id, true);

          // manually show popover
          cancelMouseoverEvent();
          $( element ).popover('show');

          // compile html on hover for ng-src directive, to enable user object 2-way binding 
          $compile( $( element ).next().find('.popover-content').contents() )(scope);


          // call server for more profile info
          if(UserModel.isLoading === false && scope.user.counts.media === "---") {
            
            UserModel.get(scope.user.id).then(function(data) {

              // set each attr individually so reference isn't broken
              scope.user.counts.media       = data.counts.media;
              scope.user.counts.follows     = data.counts.follows;
              scope.user.counts.followed_by = data.counts.followed_by;
            });
          }
        })

        // manually trigger popover hide
        .on('mouseleave', setMouseleaveEvent);


      // TODO - using event handling is bad, refactor to communicate with service
      var closePopoversEvent = $rootScope.$on('close-popovers', function(event, userId, closeAll) {
        // when closeAll is true, hide all expect userId given
        // when closeAll is undefined, only hide userId given
        if( (closeAll !== undefined && scope.user.id !== userId) || (closeAll === undefined && scope.user.id === userId) ) {
          cancelMouseoverEvent();
          $( element ).popover('hide');
        }
      });

      var cancelMouseLeaveEvent = $rootScope.$on('cancel-mouse-leave', function(event, userId) {
        if(scope.user.id === userId) {
          cancelMouseoverEvent();
        }
      });

      // cleanup
      scope.$on('$destroy', function() {
        cancelMouseoverEvent();
        closePopoversEvent();
        cancelMouseLeaveEvent();
        $( element ).unbind('mouseenter');
        $( element ).unbind('mouseleave');
      });
    }
  }
});