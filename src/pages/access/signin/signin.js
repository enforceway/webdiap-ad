'use strict';

angular.module('app').controller('signinController', [
    '$scope', '$state', '$diModal', '$diResource', '$G', 'toaster',
    function($scope, $state, $diModal, $diResource, $G, toaster) {
        $scope.user = {
            username: '',
            password: '',
        };
        $scope.authError = '';
        $scope.login = function() {
            $scope.authError = null;
            
            $diResource.post({
                url: $G.userLogin,
                data: {
                    username: $scope.user.username,
                    pwd: $scope.user.password
                }
            }).then(function(res) {
                $state.go('app.questions');
            }).catch(function(err) {
                $scope.$apply(function() {
                    $scope.authError = err.message;
                });
            });
        };
    }]
);
