'use strict';

angular.module('app').controller('addQuestionaireController', [
    '$scope', '$http', '$diModal', '$diResource', '$G', 'toaster',
    function($scope, $http, $diModal, $diResource, $G, toaster) {
        var self = $scope;
        $scope.questionaireForm = {};
        $scope.selectedQuestionConfirm = function(data) {
            debugger
        };
        $scope.addQuestionItem = function() {
            var tmp = $diModal.open({
                templateUrl: 'pages/app/common/questions-panel.html',
                controller: 'questionPanelController',
                backdrop: true,
                // scope: $scope,
                size: 'lg',
                resolve: {
                    he1: function() {
                        debugger
                        return '111'
                    }
                }
            });
            // 对选择的题目进行确认的方法
            tmp.result.then($scope.selectedQuestionConfirm)
        };
        $scope.statusArray = [{
            value: '1',
            text: '草稿'
        }, {
            value: '2',
            text: '已发布'
        }];
        $scope.cancel = function() {
            $diModal.dismiss();
        };
        $scope.toaster = {
            type: 'success',
            title: 'Title',
            text: '添加成功'
        };
        $scope.submit = function() {
            $scope.typeForm.questionType = $scope.statusArray.find(function(item, index) {
                return item.id == $scope.typeForm.questionTypeId;
            }).type;

            if($scope.item) {
                $diResource.post({
                    url: $G.updateQuestion,
                    data: self.typeForm
                }).then(function(res) {
                    debugger
                    toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
                    // debugger;
                });
            } else {
                $diResource.post({
                    url: $G.addQuestion,
                    data: self.typeForm
                }).then(function(res) {
                    debugger
                    toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
                    // debugger;
                });
            }
            $diModal.close();
        };
    }]
);
