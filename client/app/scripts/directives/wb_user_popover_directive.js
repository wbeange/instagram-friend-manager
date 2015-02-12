 angular.module('clientApp').directive('wbUserPopover', function($compile, $timeout) {
  return {
    restrict: "A",
    replace: true,
    scope: {
      user: "=wbUserPopover"  
    },

    link: function(scope, element, attrs) {
      var elId = 'user_popover_' + scope.user.id;

      // TODO - template this
      var html = ' \
        <div id="' + elId + '" style="width:250px;"> \
          <div class="quarter-page top"> \
            <div style="margin-left:auto;margin-right:auto;padding-top:3px;"> \
              <img class="ui-corner-all img-rounded" ng-src="{{user.profile_picture}}" alt="..." style="width:100%;"> \
            </div> \
          </div><div class="three-quarter-page top"> \
            <div class="padding-left-3">{{user.full_name}}</div> \
            <div class="padding-left-3">@{{user.username}}</div> \
          </div> \
          \
          <div>Web: {{user.website}}</div> \
          <div>Bio: {{user.bio}}</div> \
          \
          <div class="third-page top center"> \
            photos \
          </div><div class="third-page top center"> \
            following \
          </div><div class="third-page top center"> \
            followers \
          </div> \
        </div>';

      // initialize Javascript Bootstrap Popover library element
      $( element ).popover({
        html: true,
        placement: 'bottom',
        trigger: 'hover',
        content: html
      });

      // compile html on hover
      $( element ).mouseenter(function() {
        $compile( $('#'+elId).contents() )(scope); 
      });

    }
  }
});
