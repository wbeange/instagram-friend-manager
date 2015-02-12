 angular.module('clientApp').directive('wbUser', function($compile) {
  return {
    restrict: "A",
    replace: true,
    scope: {
      user: "=wbUser"  
    },

    link: function(scope, element, attrs) {

      // build list view

      // TODO - could put this in a template file
      var html = ' \
        <div class="" style="margin-left:auto;margin-right:auto;padding-top:3px;"> \
          <a href="http://instagram.com/{{user.username}}" target="_blank"> \
            <img class="ui-corner-all img-rounded" ng-src="{{user.profile_picture}}" alt="..." style="width:100%;"> \
          </a> \
        </div>';

      element.html(html);
      $compile(element.contents())(scope);
      
    }
  }
});
