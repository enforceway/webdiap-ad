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
        controller: ['$scope', function($scope) {
            $scope.tags = [
                { text: 'just' },
                { text: 'some' },
                { text: 'cool' },
                { text: 'tags' }
            ];
            $scope.switchItemInputType = function(type, rowData) {
                
            };
            // 题目是否失效的显示和隐藏
            $scope.toggleDisableQuestionItem = function(rowData) {
                rowData.$$itemInputType = '';
                rowData.$$answersOnShow = false;
                rowData.enabled = !rowData.enabled;
            };
            // 题目回答区域的显示和隐藏
            $scope.toggleQuestionItemAnswers = function(rowData, evt) {
                rowData.$$answersOnShow = !rowData.$$answersOnShow
            };
        }],
        link: function($scope, element, attrs, $controller) {

            // $scope.questionItemClick = function(rowData, evt) {
            //     debugger
            //     var rowDom = angular.element(evt.srcElement || evt.target);
            //     if(angular.element(evt.srcElement || evt.target)) {
    
            //     }
            //     debugger
            // };
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