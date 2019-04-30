// angular.module('app')
//   .directive('questionItemTable', ['$animate', function ($animate) {
//     return {
//         restrict: 'A',
//         template: '<div>afdafds</div>',
//         // templateUrl: 'pages/app/common/questionItemTable.html',
//         scope: {
//             // data: '<',
//         },
//         link: function ($scope, $element, $attrs) {
            
//         },
//     };
// }]);

angular.module('app').directive('questionItemTable', function() {
    return {
        restrict: 'E',
        // template: '<div>length of data is: <p ng-bind="data.length"></p></div>',
        templateUrl: 'pages/app/common/questionItemTable.html',
        scope: {
            data: '=?',
        },
        replace: true
    };
});
/**
<ul class="selected-question-list">
    <li ng-repeat="queItem in selectedQuestionItems track by queItem.id">
        <div class="question-item-container">
            <label ng-bind="$index"></label>
            <p ng-bind="queItem.questionContent"></p>
        </div>
    </li>
</ul>
*/