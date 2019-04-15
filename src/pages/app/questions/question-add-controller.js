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
        var self = $scope;
        // 获取题目类型
        $scope.getQuestionTypes = function() {
            $diResource.get({
                url: $G.listQuestionTypes,
            }).then(function(res) {
                self.types = res;
                // debugger;
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
            $scope.typeForm.questionType = $scope.types.find(function(item, index) {
                return item.id == $scope.typeForm.questionTypeId;
            }).type;

            $diResource.post({
                url: $G.addQuestion,
                data: self.typeForm
            }).then(function(res) {
                debugger
                toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
                // debugger;
            });
            $diModal.dismiss();
        };
    }]
);
