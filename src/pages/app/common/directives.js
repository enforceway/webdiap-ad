'use strict';

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

angular.module('app').service('svcConfirm', [
    '$rootScope', '$diModal',
    function($rootScope, $diModal) {
        this.confirm = function(cfg) {
            var $new = $rootScope.$new();
            $new.close = function() {
                $diModal.dismiss();
            };
            $new.confirm = function() {
                $diModal.close();
            };
            var $q = $diModal.open({
                templateUrl: 'pages/app/common/confirm/confirm-tmpl.html',
                // controller: 'questionPanelController',
                backdrop: 'static',
                scope: $new,
                // scope: $scope,
                size: 'sm',
            });
            return $q.result;
        };
    }]
);

angular.module('app').controller('questionPanelController', [
    '$scope', '$diModal', '$diResource', '$G', 'toaster',
    function($scope, $diModal, $diResource, $G, toaster) {
        var self = $scope;
        $scope.data4Questions = [];
        $scope.data4SelectedQuestions = [];
        $scope.cancelSelectQuestions = function() {
            $diModal.close(null);
        };
        $scope.confirmSelectQuestions = function() {
            $scope.$emit('evt4SelectQuestions', this.data4SelectedQuestions);
            // $scope.$emit('evt4SelectQuestions', this.data4SelectedQuestions);
            $diModal.close(this.data4SelectedQuestions);
        };
        $scope.ifExistedInSelected = function(que) {
            var res = {data: null, index: null};
            res.data = $scope.data4SelectedQuestions.find(function(item, index) {
                (que.id == item.id)?(res.index = index):('');
                return que.id == item.id;
            }) || null;
            return res;
        };
        // 取消选取题目
        $scope.unselectQuestion = function(que) {
            $scope.selectQuestion(que);
        };
        // 选取题目
        $scope.selectQuestion = function(que) {
            var existedQue = $scope.ifExistedInSelected(que);
            if(existedQue.data) {
                // 如果已经存在了选中的问题
                $scope.data4SelectedQuestions = $scope.data4SelectedQuestions.slice(0, existedQue.index).concat($scope.data4SelectedQuestions.slice(existedQue.index + 1));
            } else {
                $scope.data4SelectedQuestions.push(que);
            }
            return;
        };
        // 获取题目
        $scope.getQuesitions = function(params) {
            params = params || {};
            $diResource.get({
                url: $G.listQuestions,
                data: {}
            }).then(function(res) {
                $scope.$apply(function () {
                    $scope.data4Questions = res;
                });
            });
        };
        $scope.getQuesitions();
    }]
);
