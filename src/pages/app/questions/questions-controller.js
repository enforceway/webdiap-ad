'use strict';

angular.module('app').controller('QuestionsController', ['$diConfirm', '$scope', '$G', '$diModal', '$diResource', '$http', 'toaster', function($diConfirm, $scope, $G, $diModal, $diResource, $http, toaster) {
    $scope.questions = [];
    $scope.searchForm = {
        keyWord: ''
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
            data: {}
        }).then(function(res) {
            $scope.$apply(function () {
                $scope.questions = res;
            });
        });
    };
    $scope.search = function() {
        $scope.getQuesitions({});
    };
    $scope.search();
    // $scope.filterOptions = {
    //     filterText: "",
    //     useExternalFilter: true
    // }; 
    // $scope.totalServerItems = 0;
    $scope.pagingOptions = {
        pageSizes: [250, 500, 1000],
        pageSize: 250,
        currentPage: 1
    };
    $scope.myData = [];
    // $scope.setPagingData = function(data, page, pageSize) {
    //     var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
    //     // debugger
    //     $scope.myData = pagedData;
    //     $scope.totalServerItems = data.length;
    //     if (!$scope.$$phase) {
    //         $scope.$apply();
    //     }
    // };
    // $scope.getPagedDataAsync = function (pageSize, page, searchText) {
    //     setTimeout(function () {
    //         var data;
    //         if (searchText) {
    //             var ft = searchText.toLowerCase();
    //             $http.get('mock/largeload.json').success(function (largeLoad) {    
    //                 data = largeLoad.filter(function(item) {
    //                     return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
    //                 });
    //                 $scope.setPagingData(data,page,pageSize);
    //             });            
    //         } else {
    //             $http.get('mock/largeLoad.json').success(function (largeLoad) {
    //                 $scope.setPagingData(largeLoad,page,pageSize);
    //             });
    //         }
    //     }, 100);
    // };

    // $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

    // $scope.$watch('pagingOptions', function (newVal, oldVal) {
    //     if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
    //       $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
    //     }
    // }, true);
    // $scope.$watch('filterOptions', function (newVal, oldVal) {
    //     if (newVal !== oldVal) {
    //       $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
    //     }
    // }, true);

    // $scope.gridOptions = {
    //     data: 'myData',
    //     enablePaging: true,
    //     showFooter: true,
    //     totalServerItems: 'totalServerItems',
    //     pagingOptions: $scope.pagingOptions,
    //     filterOptions: $scope.filterOptions
    // };
}]);
