'use strict';

angular.module('app').controller('QuestionsController', ['$diBootstrapPager', '$diConfirm', '$scope', '$G', '$diModal', '$diResource', '$http', 'toaster', 
function($diBootstrapPager, $diConfirm, $scope, $G, $diModal, $diResource, $http, toaster) {
    $scope.searchForm = {
        keyWord: '',
        questions: [],
        pagination: {
            total: 0,
            pageSize: 6,
            curPage: 1,
            dataRangeStart: 0,
            dataRangeEnd: 0,
        }
    };
    $scope.goToUpdate = function(item) {
        var $ns = $scope.$new();
        $ns.item = item;
        var $q = $diModal.open({
            templateUrl: 'pages/app/questions/question-add.html',
            controller: 'addQuestionController',
            backdrop: true,
            // scope: $scope,
            size: 'md',
            scope: $ns,
        });
        $q.then(function() {
            $scope.search();
        });
    };
    $scope.toaster = {
        type: 'success',
        title: '信息提示',
        text: '删除成功'
    };
    $scope.goToDelete = function(item) {
        var $q = $diConfirm.open();
        $q.then(function() {
            debugger
            $diResource.post({
                url: $G.removeQuestions,
                data: {
                    id: item.id
                }
            }).then(function(res) {
                toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
                $scope.search();
            });
        }).catch(function() {
            debugger
        })
    };
    $scope.goToAdd = function() {
        var modalInstance = $diModal.open({
            templateUrl: 'pages/app/questions/question-add.html',
            controller: 'addQuestionController',
            backdrop: true,
            // scope: $scope,
            size: 'md'
        });
        modalInstance.then(function() {
            $scope.search();
        }).catch(function() {
            debugger
        });
    };
    
    $scope.getQuesitions = function(params) {
        params = params || {};
        $diResource.get({
            url: $G.listQuestions,
            data: {
                title: params.title || '',
                pageNo: $scope.searchForm.pagination.curPage,
                pageSize: $scope.searchForm.pagination.pageSize
            }
        }).then(function(res) {
            $scope.$apply(function () {
                $scope.searchForm.questions = res.list;
                $scope.searchForm.pagination.curPage = res.pagination.curPage;
                $scope.searchForm.pagination.pageSize = res.pagination.pageSize;
                $scope.searchForm.pagination.total = res.pagination.total;
                if($scope.searchForm.pagination.curPage == 1) {
                    $diBootstrapPager.bpager($('.callBackPager'), {
                        totalCount: res.pagination.total,
                        showPage: res.pagination.curPage,
                        limit: res.pagination.pageSize,
                        callback: function(curr, limit) {
                            $scope.searchForm.pagination.curPage = curr;
                            $scope.searchForm.pagination.pageSize = limit;
                            $scope.search();
                        }
                    })
                }
            });
        });
    };
    $scope.search = function() {
        $scope.getQuesitions({
            title: $scope.searchForm.keyWord
        });
    };
    $scope.$watch('searchForm.pagination', function(nValue) {
        $scope.searchForm.pagination.dataRangeStart = nValue.pageSize * (nValue.curPage - 1) + 1;
        $scope.searchForm.pagination.dataRangeEnd = Math.min(nValue.pageSize * nValue.curPage, nValue.total || 0)
    }, true);
    $scope.search();
}]);
