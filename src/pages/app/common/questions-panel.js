'use strict';

angular.module('app').controller('questionPanelController', [
    '$scope', '$http', '$diModal', '$diResource', '$G', 'toaster',
    function($scope, $http, $diModal, $diResource, $G, toaster) {
        var self = $scope;
        $scope.data4Questions = [];
        $scope.data4SelectedQuestions = [];
        $scope.cancelSelectQuestions = function() {
            $diModal.close();
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
