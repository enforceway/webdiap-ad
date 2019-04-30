angular.module('app')
  .directive('questionItemTable', ['$animate', function ($animate) {
    return {
        restrict: 'A',
        templateUrl: 'pages/app/common/questionItemTable.html',
        scope: {
            data: '<',
        },
        link: function ($scope, $element, $attrs) {
            
        },
    };
}]);
