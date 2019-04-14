'use strict';

angular.module('app').controller('addQuestionController', [
    '$scope', '$http', '$diModal', 
    function($scope, $http, $diModal) {
        $scope.cancel = function() {
            $diModal.dismiss();
        };
        $scope.submit = function() {
            
        };
    }]
);
