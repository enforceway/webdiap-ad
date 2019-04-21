'use strict';

angular.module('app').controller('questionPanelController', [
    '$scope', '$http', '$diModal', '$diResource', '$G', 'toaster',
    function($scope, $http, $diModal, $diResource, $G, toaster) {
        var self = $scope;

        $scope.data4Questions = [];
        $scope.data4SelectedQuestions = [];

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
