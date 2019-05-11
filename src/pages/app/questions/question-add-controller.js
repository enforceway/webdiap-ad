'use strict';

angular.module('app').controller('addQuestionController', [
    '$scope', '$http', '$diModal', '$diResource', '$G', 'toaster',
    function($scope, $http, $diModal, $diResource, $G, toaster) {
        var self = $scope;
        $scope.types = [];
        $scope.typeForm = {
            questionTypeId: '',
            questionContent: '',
            questionType: ''
        };
        if($scope.item) {
            $scope.typeForm.id = $scope.item.id;
            $scope.typeForm.questionTypeId = $scope.item.questionTypeId;
            $scope.typeForm.questionType = $scope.item.questionType;
            $scope.typeForm.questionContent = $scope.item.questionContent;
        }
        
        // 获取题目类型
        $scope.getQuestionTypes = function() {
            $diResource.get({
                url: $G.listQuestionTypes,
            }).then(function(res) {
                $scope.$apply(function() {
                    $scope.types = res;
                })
            });
        };
        $scope.getQuestionTypes();
        $scope.cancel = function() {
            $diModal.dismiss();
        };
        $scope.toaster = {
            type: 'success',
            title: 'Title',
            text: '添加成功'
        };
        $scope.submit = function() {
            let tmp = $scope.types.find(function(item, index) {
                return item.id == $scope.typeForm.questionTypeId;
            });
            $scope.typeForm.questionType = tmp.type;
            $scope.typeForm.questionTypeId = +$scope.typeForm.questionTypeId;
            if($scope.item) {
                // 更新操作
                $diResource.post({
                    url: $G.updateQuestion,
                    data: self.typeForm
                }).then(function(res) {
                    toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
                });
            } else {
                // 新增操作
                $diResource.post({
                    url: $G.addQuestion,
                    data: self.typeForm
                }).then(function(res) {
                    toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
                });
            }
            $diModal.close();
        };
    }]
);
