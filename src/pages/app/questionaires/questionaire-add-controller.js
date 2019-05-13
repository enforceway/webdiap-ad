'use strict';

angular.module('app').controller('addQuestionaireController', [
    '$state', '$scope', '$stateParams', '$diModal', '$diResource', '$G', 'toaster',
    function($state, $scope, $stateParams, $diModal, $diResource, $G, toaster) {
        // var self = $scope;
        $scope.questionaireForm = {
            statusId: '',
            activeDateStart: '',
            activeDateEnd: '',
            questionsList: [],
        };
        $scope.statusArray = [{
            value: '1',
            text: '草稿'
        }, {
            value: '2',
            text: '已发布'
        }];
        $scope.toaster = {
            type: 'success',
            title: 'Title',
            text: '添加成功'
        };
        if($state.current.name == 'app.updateQuestionaire' && $stateParams.questionaireId) {
            // 更新问卷
            $scope.ifUpdate = true;
        }
        $scope.confirmSelected = function(data) {
            data = data || [];
            data = data.map(function(item) {
                return {
                    // id: item.id,
                    questionContent: item.questionContent,
                    questionId: item.id,
                    // questionaireId: 2,
                    questionType: '',
                    enabled: true,
                    options: []
                }
            })
            $scope.questionaireForm.questionsList = $scope.questionaireForm.questionsList.concat(data);
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
            tmp.result.then($scope.confirmSelected)
        };
        $scope.cancel = function() {
            $state.go('app.questionaires');
        };
        $scope.submit = function() {
            var url = $G.addQuestionaire;
            if($scope.ifUpdate) {
                url = $G.updateQuestionaire;
            }
            var params = {
                activeDateStart: $scope.questionaireForm.activeDateStart,
                activeDateEnd: $scope.questionaireForm.activeDateEnd,
                statusId: $scope.questionaireForm.statusId,
                theme: $scope.questionaireForm.theme,
            };
            params.questionsList = $scope.questionaireForm.questionsList.map(function(que) {
                return {
                    enabled: que.enabled?1:0,
                    questionType: que.$$itemInputType,
                    questionId: que.questionId,
                    questionContent: que.questionContent,
                    options: que.$$tags.map(function(item) {
                        return {
                            optionContent: item.text
                        }
                    })
                }
            });
            debugger
            $diResource.post({
                url: url,
                data: params,
            }).then(function(res) {
                debugger
                // toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
            });
        };
    }]
);
