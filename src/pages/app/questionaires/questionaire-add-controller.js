'use strict';

angular.module('app').controller('addQuestionaireController', [
    'svcConfirm', '$state', '$scope', '$stateParams', '$diModal', '$diResource', '$G', 'toaster',
    function(svcConfirm, $state, $scope, $stateParams, $diModal, $diResource, $G, toaster) {
        // var self = $scope;
        $scope.queRemoveCallback = function(item, idex, config) {
            var $q = svcConfirm.confirm();
            $q.then(function() {
                debugger
                var targetIndex = null;
                if($scope.ifUpdate == true) {
                    var res = $scope.newAdded.find(function($item) {
                        return $item === item;
                    });
                    if(res) {
                        debugger
                        // 本地删除
                        $scope.questionaireForm.questionsList.forEach(function($item, index) {
                            if(item === $item) {
                                targetIndex = index;
                                return false;
                            }
                        });
                    } else {
                        debugger
                        targetIndex = idex
                        // 调用api进行删除
                        $diResource.put({
                            url: $G.removeQuestionItem,
                            data: {
                                id: item.id
                            },
                        });
                    }
                } else {
                    // 本地删除
                    $scope.questionaireForm.questionsList.forEach(function($item, index) {
                        if(item === $item) {
                            targetIndex = index;
                            return false;
                        }
                    });
                }
                if(targetIndex != null) {
                    debugger
                    $scope.questionaireForm.questionsList = 
                    $scope.questionaireForm.questionsList.slice(0, targetIndex).concat(
                        $scope.questionaireForm.questionsList.slice(targetIndex + 1)
                    );
                }
            });
        };
        $scope.open = function(dateType, $event) {
            $event.preventDefault();
            $event.stopPropagation();

            var closeType = {
                'Start': 'End',
                'End': 'Start',
            };

            $scope['opened' + dateType] = true;
            $scope['opened' + closeType[dateType]] = false;
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1,
            class: 'datepicker'
        };

        $scope.initDate = new Date('2016-15-20');
        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];



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
            $scope.newAdded = [];
            $scope.ifUpdate = true;
            $diResource.get({
                url: $G.listQuestionaires + '/' + $stateParams.questionaireId,
            }).then(function(res) {
                $scope.$apply(function() {
                    $scope.reform(res);
                })
            });
        }
        $scope.reform = function(res) {
            $scope.questionaireForm = res;
            $scope.questionaireForm.statusId = res.statusId + '';
            $scope.questionaireForm.questionsList.forEach(function(item) {
                item.$$itemInputType = item.questionType + '';
                item.$$tags = item.options.map(function(itm) {
                    return {
                        text: itm.optionContent,
                    }
                });
            });
        };
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
            });
            
            if($scope.ifUpdate == true) {
                data.forEach(function(item) {
                    $scope.newAdded.push(item);
                });
            }
            $scope.questionaireForm.questionsList = $scope.questionaireForm.questionsList.concat(data);
        };
        $scope.addQuestionItem = function() {
            var tmp = $diModal.open({
                templateUrl: 'pages/app/common/question-panel/questions-panel.html',
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
                title: $scope.questionaireForm.title,
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
            $diResource.post({
                url: url,
                data: params,
            }).then(function(res) {
                $state.go('app.questionaires');
                // toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
            });
        };
    }]
);
