'use strict';

angular.module('app').controller('addQuestionaireController', [
    'svcConfirm', '$state', '$scope', '$stateParams', '$diModal', '$diResource', '$G', 'toaster',
    function(svcConfirm, $state, $scope, $stateParams, $diModal, $diResource, $G, toaster) {
        // var self = $scope;.
        $scope.itemOptionRemoveCallback = function(tag) {
            if(tag.id) {
                $scope.originQuestionList.forEach(function(item, index) {
                    var option = item.options.find(function(itm, idx) {
                        return itm.id === tag.id
                    });
                    if(option) {
                        option.ifRemoved = true;
                    }
                });
            }
        };
        $scope.queRemoveCallback = function(item, idex, config) {
            return
            var $q = svcConfirm.confirm();
            $q.then(function() {

                return;
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
            questionsList: [],
        };
        $scope.statusArray = [{
            value: 1,
            text: '草稿'
        }, {
            value: 2,
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
                if(!res) {
                    toaster.pop('info', "提示", "未找到任何调查问卷");
                    return;
                }
                $scope.originQuestionList = [];
                $.extend(true, $scope.originQuestionList, res.questionsList);
                $scope.$apply(function() {
                    $scope.reform($scope.questionaireForm, res);
                })
            });
        }
        $scope.reform = function(dist, source) {
            var attrs = ['id', 'title', 'statusId', 'activeDateStart', 'activeDateEnd', 'questionsList'];
            angular.forEach(source, function(index, attr) {
                if(attrs.indexOf(attr) != - 1) {
                    dist[attr] = source[attr];
                }
            });
            dist.questionsList.forEach(function(item) {
                item.$$itemInputType = item.questionType;
                item.$$tags = item.options.map(function(itm) {
                    return {
                        id: itm.id,
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
            tmp.then($scope.confirmSelected)
        };
        $scope.cancel = function() {
            $state.go('app.questionaires');
        };
        $scope.submit = function() {
            var url = ($scope.ifUpdate == true)? $G.updateQuestionaire : $G.addQuestionaire;
            var params = {
                activeDateStart: $scope.questionaireForm.activeDateStart,
                activeDateEnd: $scope.questionaireForm.activeDateEnd,
                statusId: $scope.questionaireForm.statusId,
                title: $scope.questionaireForm.title,
            };
            ($scope.ifUpdate == true)?(params.id = $scope.questionaireForm.id):('');
            // $scope. 
            params.questionsList = $scope.questionaireForm.questionsList.filter(function(que) {
                if(que.$$removed == true) {
                    return false;
                }
                return true;
            }).map(function(que) {
                var optTags = que.$$tags.map(function(item) {
                    var ntag = {
                        optionContent: item.text
                    };
                    if(item.id) {
                        ntag.id = item.id;
                    }
                    return ntag;
                });
                var nq = {
                    enabled: que.enabled?1:0,
                    questionType: que.$$itemInputType,
                    questionId: que.questionId,
                    questionContent: que.questionContent,
                    options: optTags,
                    questionaireId: que.questionaireId
                };
                if($scope.ifUpdate == true) {
                    $scope.originQuestionList.filter(function(queItem) {
                        return queItem.id == que.id
                    }).forEach(function(eachQue, index) {
                        var tmp = eachQue.options.filter(function(opt) {
                            return opt.ifRemoved == true && que.$$tags.filter(function(option) {
                                return option.id != opt.id;
                            })
                        });
                        tmp = tmp.map(function(itmm) {
                            return {
                                id: itmm.id,
                                ifRemoved: itmm.ifRemoved,
                                optionContent: itmm.optionContent,
                            };
                        });
                        nq.options = optTags.concat(tmp);
                    });
                    nq.id = que.id
                }
                return nq;
            });
            // if($scope.questionaireForm.$invalid) {
            //     alert('没有输入必填项');
            //     return
            // }
            $diResource.post({
                url: url,
                data: params,
            }).then(function(res) {
                var msg = '创建成功'
                if($scope.ifUpdate == true) {
                    msg = '更新成功';
                }
                toaster.pop('success', "提示", msg);
                $state.go('app.questionaires');
            });
        };
    }]
);
