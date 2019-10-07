'use strict';

angular.module('app').controller('QuestionsController', ['$diBootstrapPager', '$diConfirm', '$scope', '$G', '$diModal', '$diResource', '$http', 'toaster', 
function($diBootstrapPager, $diConfirm, $scope, $G, $diModal, $diResource, $http, toaster) {
    $scope.searchForm = {
        keyWord: '',
        questions: [],
        pagination: {
            total: 0,
            pageSize: 0,
            pageIndex: 0
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
            }
        }).then(function(res) {
            $scope.$apply(function () {
                $scope.searchForm.questions = res.data;
                $diBootstrapPager.bpager($('.callBackPager'), {
                    totalCount: res.pagination.total,
                    // showCount: res.pagination.curPage,
                    limit: res.pagination.pageSize
                })
            });
        });
    };
    $scope.search = function() {
        $scope.getQuesitions({
            title: $scope.searchForm.keyWord
        });
    };
    $scope.search();
    $scope.myData = [];
}]);
