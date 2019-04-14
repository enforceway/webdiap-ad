var modalInstance = $modal.open({
    templateUrl: 'pages/app/questions/questions-add.html',
    controller: 'addQuestionController',
    backdrop: true,
    scope: $scope,
    size: 'md',
    // resolve: {
    //     items1: function () {
    //         return $scope.items;
    //     }
    // }
});