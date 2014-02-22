(function() {

  define([
    'angular'
  ], function (
    angular
  ) {

    // A simple directive to display a gravatar image given an email
    return angular.module('application.directives')
      .directive('avatar', [
      '$compile',
      function($compile) {
        return{
          restrict:"E",
          template: '<a href="{{avatarLink}}"> <img width="{{avatarWidth}}" height="{{avatarHeight}}" class="{{avatarClass}}" data-ng-src="{{avatarImageUrl}}"/> </a>',
          scope: {
            avatarId: '=avatar',
          },
          link: function (scope, elm, attrs) {

            function setVars(avatarId){
              if(attrs['avatarLink']){
                scope.avatarLink = attrs['avatarLink'];
              }

              switch(attrs['avatarSize']) {
                case 'medium':
                  scope.avatarWidth = '200px';
                  scope.avatarHeight = '200px';
                  scope.avatarClass = 'img-rounded avatar-medium';
                  break;
                default:
                  scope.avatarWidth = '50px';
                  scope.avatarHeight = '50px';
                  scope.avatarClass = 'img-rounded avatar-small';
              }

              if ((avatarId !== null) && (avatarId !== undefined) && (avatarId !== '')) {
                scope.avatarImageUrl = '/images/' + avatarId ;
              } else {
                scope.avatarImageUrl = '/imgs/avatars/user-avatar.png';
              }
            }

            setVars( scope.avatarId );

            scope.$watch(attrs.avatar, function (avatarId) {
              setVars(avatarId);
            });
          }

        };
      }
    ]);
  });
}());
